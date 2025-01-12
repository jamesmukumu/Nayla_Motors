import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';
import 'package:nayla_motor_car/services/carServ.dart';
import 'package:nayla_motor_car/redux/actions/pop.dart';

class Wish extends StatefulWidget {
  const Wish({super.key});

  @override
  State<Wish> createState() => _WishState();
}

class _WishState extends State<Wish> {
  final carService = CarService();
  List<dynamic> carSlugs = [];
  List<dynamic> carData = [];

  Future<void> fetchCarsIndividually() async {
    try {
      for (var carSlug in carSlugs) {
        var response = await carService.FetchCar(carSlug);
        if (response != null) {
          final data = json.decode(response.body);
          var actualData = data["data"];
          setState(() {
            carData.add(actualData);
          });
        }
      }
    } catch (err) {
      print("Error fetching cars: $err");
    }
  }

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final carSlugsFromStore = StoreProvider.of<CarRed>(context).state.carSlugs;
      setState(() {
        carSlugs = carSlugsFromStore;
      });
      if (carSlugs.isNotEmpty) {
        fetchCarsIndividually();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: carSlugs.isEmpty
          ? const Center(
        child: Text("Car wishlist is currently empty"),
      )
          : carData.isEmpty
          ? const Center(
        child: CircularProgressIndicator(),
      )
          : SingleChildScrollView(
        child: Column(
          children: carData.map((data) => CarDisplay(carInfo: data)).toList(),
        ),
      ),
    );
  }
}

class CarDisplay extends StatelessWidget {
  final dynamic carInfo;

  const CarDisplay({super.key, required this.carInfo});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      elevation: 3.0,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, "/car", arguments: {
                  "carSlug": carInfo["slug"],
                });
              },
              child: Container(
                width: double.infinity,
                height: 200.0,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8.0),
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: carInfo["thumbnail"] != null && carInfo["thumbnail"].isNotEmpty
                        ? NetworkImage(carInfo["thumbnail"])
                        : const AssetImage("lib/assets/naylamotors.webp") as ImageProvider,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8.0),
            Text(
              "${carInfo['name']} ${carInfo['year_of_manufacture']}",
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16.0,
              ),
            ),
            const SizedBox(height: 4.0),
            Text(
              carInfo["description"] ?? "No description available",
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 4.0),
            Text(
              "KES ${carInfo["price"].toString().replaceAllMapped(
                RegExp(r'\B(?=(\d{3})+(?!\d))'),
                    (match) => ",",
              )}",
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 8.0),
            Align(
              alignment: Alignment.centerRight,
              child: StoreConnector<CarRed, VoidCallback>(
                converter: (store) {
                  return () => store.dispatch(PopWishList(store.state.carSlugs));
                },
                builder: (context, callback) {
                  return TextButton(
                    style: TextButton.styleFrom(
                      backgroundColor: Colors.brown[400],

                    ),
                    onPressed: () {
                      callback();


                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text("Car removed from wishlist")),
                      );
                    },
                    child: const Text("Remove",style: TextStyle(
                      color: Colors.white,
                      letterSpacing: 1.55
                    ),),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
