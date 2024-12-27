import 'package:flutter/material.dart';
import 'package:nayla_motor_car/widgets/car.dart';
import 'package:nayla_motor_car/widgets/landing_page.dart';
import 'package:nayla_motor_car/widgets/home.dart';
import 'package:nayla_motor_car/widgets/categories.dart';


void main() {
  runApp(
    MaterialApp(
      initialRoute: "/",
      routes: {
        "/":(context)=>Home(),
        "/car":(context)=>Car()
      },
      theme: ThemeData(

        progressIndicatorTheme: ProgressIndicatorThemeData(
          color: Colors.brown.shade400
        ),
        scaffoldBackgroundColor: Colors.white,
        bottomNavigationBarTheme: BottomNavigationBarThemeData(
          unselectedItemColor: Colors.black38
        )
      ),

    )
  );
}

