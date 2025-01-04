import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';
import 'package:nayla_motor_car/services/carServ.dart';
import 'package:nayla_motor_car/pages/cars.dart';
import 'package:redux/redux.dart';
import 'package:nayla_motor_car/redux/actions/addToWishList.dart';

class Filter extends StatefulWidget {
  const Filter({super.key});

  @override
  State<Filter> createState() => _FilterState();
}

class _FilterState extends State<Filter> {
  @override
  late String carBrand;
  final cars = CarService();
  late List<dynamic> carData;
  late Future<void> fetchingFilterories;
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    final carName = ModalRoute.of(context)!.settings.arguments as Map;
    setState(() {
      carData = json.decode(carName['data']);
    });

  }
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          backgroundColor: Colors.white,
          centerTitle: true,
          title:  Text("Results (${carData.length})",style: TextStyle(
                  letterSpacing: 1.55
              ),)

      ),
      body: FilterComp(),
    );
  }
}



class FilterComp extends StatefulWidget {
  const FilterComp({super.key});

  @override
  State<FilterComp> createState() => _FilterCompState();
}

class _FilterCompState extends State<FilterComp> {
  late List<dynamic> carData;
  final cars = CarService();
  late Future<void> fetchingFilterories;
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
            child:    StoreConnector<CarRed,VoidCallback>(
              converter: (state){
                return ()=>state.dispatch(AddWishList(carInfo['slug']));
              },
              builder: (ctx,cb){
                return Center(
                  child: TextButton(
                    style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(Colors.brown[400])
                    ),
                    onPressed: (){
                      cb();
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Car added to wishlist")));
                    },
                    child: Text(
                      "Wish List",
                      style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: Colors.white
                      ),
                    ),
                  ),
                );
              },
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
   setState(() {
     carData = json.decode(carName['data']);
   });

  }
  @override
  Widget build(BuildContext context) {
    return GridView.count(
          crossAxisCount: 2,
          children:carData.map((data)=>carDisplayTemp(data)).toList() ,

        );

  }
}
