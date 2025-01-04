import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';
import 'package:nayla_motor_car/services/carServ.dart';
import 'dart:convert';
import 'package:nayla_motor_car/redux/actions/addToWishList.dart';


class Cars extends StatefulWidget {
  const Cars({super.key});

  @override
  State<Cars> createState() => _CarsState();
}

class _CarsState extends State<Cars> {
  final Car = CarService();
 Future<void>? fetching;
List<dynamic> audiDisplay = [];


Future<void> refresh()async{
  fetching =   Car.fetchCars("Audi").then((data){
    dynamic carInfo = json.decode(data!.body);
    setState(() {
      audiDisplay = carInfo["data"];

    });
  });
}
@override
  void initState() {
    // TODO: implement initState
    super.initState();
   fetching =  Car.fetchCars("Audi").then((data){
     dynamic carInfo = json.decode(data!.body);
     setState(() {
       audiDisplay = carInfo["data"];

     });
    });
  }

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

                  errorBuilder: (ctx,i,stack){
                    return Image(fit: BoxFit.cover,image: AssetImage('lib/assets/naylamotors.webp'));
                  },
                  fit: BoxFit.cover,
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
              child: StoreConnector<CarRed,VoidCallback>(builder: (ctx,CB){
                return TextButton(
                  style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(Colors.brown[400])
                  ),
                  onPressed: (){
                    CB();
                    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Car added to wish List")));

                  },
                  child: Text(
                    "Wish List",
                    style: TextStyle(
                        fontWeight: FontWeight.w600,
                        color: Colors.white
                    ),
                  ),
                );
              }, converter: (store){
                return ()=> store.dispatch(AddWishList(carInfo['slug']));
              })
            ),
          ),
        ],
      ),
    );
  }




  @override
  Widget build(BuildContext context) {
    return Container(
      child: FutureBuilder(future: fetching, builder: (ctx,snap){
        if(snap.connectionState ==  ConnectionState.done){
          return  RefreshIndicator(
            onRefresh: refresh,
            child: GridView.count(
              crossAxisCount: 2,
              children:audiDisplay.map((data)=>carDisplayTemp(data)).toList() ,

            ),
          );
        }else{
          return Center(child: CircularProgressIndicator());
        }
      }),

    );
  }
}





