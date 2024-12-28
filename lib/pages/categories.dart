import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:nayla_motor_car/services/carServ.dart';
import 'package:nayla_motor_car/pages/cars.dart';

 class Categ extends StatefulWidget {
  const Categ({super.key});

  @override
  State<Categ> createState() => _CategState();
}

class _CategState extends State<Categ> {
  @override
late String carBrand;
  final cars = CarService();
  late List<dynamic> carData;
  late Future<void> fetchingCategories;
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    final carName = ModalRoute.of(context)!.settings.arguments as Map;
    fetchingCategories = cars.FetchCarBrands(carName['category']).then((data){
      final actualData = json.decode(data!.body);
      setState(() {
        carBrand = carName['category'];
        carData =  actualData['data'];

      });
    });

  }
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        centerTitle: true,
        title: FutureBuilder(future: fetchingCategories, builder:(ctx,snap){
          if(snap.connectionState == ConnectionState.done){
            return Text("$carBrand (${carData.length})",style: TextStyle(
                letterSpacing: 1.55
            ),);
          }else{
            return LinearProgressIndicator(
              color: Colors.brown[300],
            );
          }
        })
      ),
      body: CategComp(),
    );
  }
}



class CategComp extends StatefulWidget {
  const CategComp({super.key});

  @override
  State<CategComp> createState() => _CategCompState();
}

class _CategCompState extends State<CategComp> {
 late List<dynamic> carData;
  final cars = CarService();
  late Future<void> fetchingCategories;
  final carsTempp =  Cars();

 Widget carDisplayTemp(dynamic carInfo) {
   String carPrice = carInfo['Priceintform'].toString();

   return Card(
     color: Colors.white,
     elevation: 3.0,
     child: Column(
       children: [
         Expanded(
           flex: 5,
           child:  InkWell(
             onTap: (){
               Navigator.pushNamed(context,"/car",arguments: {
                 "carSlug":carInfo["slug"]
               });
             },
             child: Container(
               width: double.infinity,
               child: Image(
                 fit: BoxFit.cover,
                 errorBuilder: (ctx,obj,stack)=>Image(fit: BoxFit.cover,image: AssetImage('lib/assets/naylamotors.webp')),
                 image: carInfo["thumbnail"]!.isNotEmpty
                     ? NetworkImage(carInfo['thumbnail'])
                     : AssetImage("lib/assets/naylamotors.webp") as ImageProvider,
               ),
             ),
           ),
         ),

         Expanded(
           flex: 1,
           child: Center(
             child: Text(
               "${carInfo['name']} ${carInfo['year_of_manufacture']}",
               style: TextStyle(
                 fontWeight: FontWeight.bold,
                 letterSpacing: 1.55,
               ),
             ),
           ),
         ),
         Expanded(
           flex: 1,
           child: Center(
             child: Text(
               carInfo["description"],
               maxLines: 2,
               overflow: TextOverflow.ellipsis,
             ),
           ),
         ),
         Expanded(
           flex: 1,
           child: Center(
             child: Text(
               "KES " + carPrice.replaceAll(RegExp(r'\B(?=(\d{3})+(?!\d))'), ","),
               style: TextStyle(
                 fontWeight: FontWeight.w600,
               ),
             ),
           ),
         ),

         Expanded(
           flex: 2,
           child: Center(
             child: TextButton(
               style: ButtonStyle(
                   backgroundColor: MaterialStateProperty.all(Colors.brown[400])
               ),
               onPressed: (){},
               child: Text(
                 "Wish List",
                 style: TextStyle(
                     fontWeight: FontWeight.w600,
                     color: Colors.white
                 ),
               ),
             ),
           ),
         ),
       ],
     ),
   );
 }

  @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    final carName = ModalRoute.of(context)!.settings.arguments as Map;
    fetchingCategories = cars.FetchCarBrands(carName['category']).then((data){
      final actualData = json.decode(data!.body);
      setState(() {
        carData =  actualData['data'];

      });
    });

  }
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(future: fetchingCategories, builder:(ctx,snap){
      if(snap.connectionState == ConnectionState.done){
        return GridView.count(
          crossAxisCount: 2,
          children:carData.map((data)=>carDisplayTemp(data)).toList() ,

        );;
      }else{
        return Center(
          child: CircularProgressIndicator(),
        );
      }


    });
  }
}
