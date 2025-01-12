import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:nayla_motor_car/widgets/car.dart';
import 'package:nayla_motor_car/widgets/landing_page.dart';
import 'package:nayla_motor_car/widgets/home.dart';
import 'package:nayla_motor_car/widgets/categories.dart';
import 'package:nayla_motor_car/pages/categories.dart';
import 'package:nayla_motor_car/widgets/filter.dart';
import 'package:redux/redux.dart';
import 'package:nayla_motor_car/redux/reducers/carReducer.dart';
import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';



void main()async {

  WidgetsFlutterBinding.ensureInitialized();
 await Firebase.initializeApp();
  final Store<CarRed> naylaStore = Store(carsReducer, initialState:CarRed());

  runApp(
     StoreProvider<CarRed>(
       store: naylaStore,
       child: MaterialApp(

        initialRoute: "/",
        routes: {
          "/":(context)=>LandingSite(),
          "/home":(context)=>Home(),
          "/filter":(context)=>Filter(),
          "/car":(context)=>Car(),
          "/category":(context)=>Categ()
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

           ),
     )
  );
}

