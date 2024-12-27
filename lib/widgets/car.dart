import 'dart:convert';
import 'package:carousel_slider/carousel_controller.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:nayla_motor_car/services/carServ.dart';
import 'package:url_launcher/url_launcher.dart';


 class Car extends StatefulWidget {
  const Car({super.key});

  @override
  State<Car> createState() => _CarState();
}

class _CarState extends State<Car> {
 late String carSlug;


   @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    var map = ModalRoute.of(context)!.settings.arguments as Map;
    setState(() {
      carSlug =  map['carSlug'];
    });
  }

  @override

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CarBody(),
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(carSlug),
      ),
    );
  }
}




class CarBody extends StatefulWidget {
  const CarBody({super.key});


  @override
  State<CarBody> createState() => _CarBodyState();
}

class _CarBodyState extends State<CarBody> {
late dynamic carData ;
late dynamic interiorSpecs;
late dynamic safetySpecs;
CarouselSliderController buttonCarouselController = CarouselSliderController();
  late Future<void> carFetched;
  late Future<void> imgsFetched;
  late List<dynamic> interiorKeys;
  late List<dynamic> interiorValues;
late List<dynamic> SafetyKeys;
late List<dynamic> SafetyValues;
  List carImages = [];
CarService car = CarService();

@override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    final args =  ModalRoute.of(context)?.settings.arguments as Map;
   String carSlug = args["carSlug"];
     carFetched = car.FetchCar(carSlug).then((data){
       final carInfo = json.decode(data!.body);
       setState(() {
         carData = carInfo['data'];
         interiorSpecs = carData['interior_features'];
         safetySpecs = carData['safety_features'];


         interiorKeys = interiorSpecs.keys.toList();
         interiorValues = interiorSpecs.values.toList();
         SafetyKeys = safetySpecs.keys.toList();
         SafetyValues = safetySpecs.values.toList();
       });

    });

   imgsFetched =  car.FetchCarImages(carSlug).then((data){
       final dataa =  json.decode(data!.body);
      dynamic pageProps = dataa['pageProps'] as Map;
      dynamic carImgs = pageProps['vehicle']['vehicle_images'];
       setState(() {
         carImages = carImgs;
       });

     }).catchError((err){
       print(err);
     });

}


Future<void> launchUrll()async{
  await launchUrl(Uri.parse("https://naylamotors.vercel.app/car/${carData['slug']}"));
}
Widget carSpecs(int idx,dynamic interiorFtrs){
  return Container(
    child: Row(
      children: [
        Text(interiorFtrs),
        SizedBox(width: 10.0,),
        VerticalDivider(),
        if(interiorValues[idx] is bool && !interiorValues[idx])Icon(Icons.close,color: Colors.red,),
        if(interiorValues[idx] is bool && interiorValues[idx])Icon(Icons.check,color: Colors.green,) else if(interiorValues[idx] is String || interiorValues[idx] is int) Text("${interiorValues[idx]}"),
      ],
    ),
  );
}


Widget carSafety(int idx,dynamic interiorFtrs){
  return Container(
    child: Row(
      children: [
        Text(interiorFtrs),
        SizedBox(width: 10.0,),
        VerticalDivider(),
        if(SafetyValues[idx] is bool && !SafetyValues[idx])Icon(Icons.close,color: Colors.red,),
        if(SafetyValues[idx] is bool && SafetyValues[idx])Icon(Icons.check,color: Colors.green,) else if(SafetyValues[idx] is String || SafetyValues[idx] is int) Text("${SafetyValues[idx]}"),
      ],
    ),
  );
}

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: carFetched,
      builder: (ctx, snap) {
        if (snap.connectionState == ConnectionState.done) {
          return Column(
            children: [
              SizedBox(
                width: double.infinity,
                child: Image(
                  fit: BoxFit.cover,
                  image: NetworkImage(carData["thumbnail"]),
                ),
              ),
              RichText(
                text: TextSpan(
                  style: TextStyle(color: Colors.black),
                  text: "Total Landing Costs KES ${carData['price']} (All Taxes Included)",
                ),
              ),
              Text("Annual Insurance Fee KES  ${carData['annual_insurance']}"),
              Text(
                "${carData['name']} ${carData['year_of_manufacture']}",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.55,
                ),
              ),
               Center(child: Row(
                 mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(onPressed: (){
                    showModalBottomSheet(
                        backgroundColor: Colors.white,
                      showDragHandle: true,
                        enableDrag: true,
                        context: context, builder: (ctx){
                        return  SingleChildScrollView(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(interiorKeys.length, (idx)=>carSpecs(idx, interiorKeys[idx])),
                        
                        ),
                      );
                    });

                  }, child:Text('Car Specification',style: TextStyle(
                    color: Colors.white,
                    letterSpacing: 1.55
                  ),),style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.brown[300])
                  ),),
                  ElevatedButton(onPressed: (){
                    showModalBottomSheet(
                        backgroundColor: Colors.white,
                        showDragHandle: true,
                        enableDrag: true,
                        context: context, builder: (ctx){
                      return  SingleChildScrollView(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(SafetyKeys.length, (idx)=>carSafety(idx, SafetyKeys[idx])),

                        ),
                      );
                    });


                  },style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.brown[300])
                  ), child:Text('Car Safety',style: TextStyle(
                    color: Colors.white
                  ),)),
                ],
                             ),),
               InkWell(
                 onTap:launchUrll,
                 child: Text("View in web",style: TextStyle(
                  color: Colors.blue[400],
                  letterSpacing: 1.55
                               ),),
               ),
              Flexible(
                child: Text("${carData['description']}"),
              ),
             SizedBox(height: 20.0,),
              Expanded(
                child: ListView(
                  children: [
                    Row(
                      children: [
                        Text("Year of Manufacture:"),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData['year_of_manufacture'].toString()),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Location:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData["current_location"]),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Estimated Arrival Days:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData["estimated_arrival_days"].toString()),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Drive:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData["drive"]),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Mileage:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("${carData["mileage"]} KM"),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Engine Size:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData["engine_specifications"]['engine_size'].toString()),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Text("Horse Power:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("${carData["engine_specifications"]['horse_power']} HP"),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Transmission:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData["engine_specifications"]['transmission']),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Aspiration:"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(carData["engine_specifications"]['aspiration']),
                        ),
                      ],
                    ),
                    Divider(),
                    Row(
                      children: [
                        Text("Acceleration (0-100 KPH):"),
                        VerticalDivider(),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text("${carData["engine_specifications"]['acceleration']} Seconds"),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              SizedBox(height: 50.0,),
              Expanded(
                child: SizedBox(
                  width: double.infinity,
                  child: CarouselSlider(
                    carouselController: buttonCarouselController,
                    items: carImages.map((img) {
                      return Builder(
                        builder: (ctx) {
                          return SizedBox(
                            width: double.infinity,
                            height: 900,
                            child: Image(
                              fit: BoxFit.cover,
                              image: NetworkImage(img['image']),
                              errorBuilder: (ctx, obj, stackTrace) =>
                                  Icon(Icons.broken_image),
                            ),
                          );
                        },
                      );
                    }).toList(),
                    options: CarouselOptions(
                      height: double.infinity,
                      pauseAutoPlayOnTouch: true,
                      autoPlay: true,
                      autoPlayCurve: Curves.fastOutSlowIn,
                      enableInfiniteScroll: true,
                      autoPlayAnimationDuration: Duration(milliseconds: 800),
                      viewportFraction: 0.8,
                    ),
                  ),
                ),
              ),
            ],
          );
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }

}
