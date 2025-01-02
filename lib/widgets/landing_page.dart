import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import 'package:awesome_notifications/awesome_notifications.dart';


class Landing extends StatelessWidget {
  const Landing({super.key});


  @override
  Widget build(BuildContext context) {
    return Container(
        child:Padding(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image(image: AssetImage("lib/assets/naylamotors.webp"))
              ],
            ),
            padding: EdgeInsets.all(9.9)),

    );
  }
}


class LandingSite extends StatefulWidget {
  const LandingSite({super.key});

  @override
  State<LandingSite> createState() => _LandingSiteState();
}

class _LandingSiteState extends State<LandingSite> {

  final firebase = FirebaseMessaging.instance;


  Future<void> checkLocationPermission()async{
    final isLocationGranted = await Geolocator.checkPermission();
    if(isLocationGranted == LocationPermission.denied){
      Geolocator.requestPermission();
    }else{
      final locaction = await Geolocator.getCurrentPosition();
     final loc = await placemarkFromCoordinates(locaction.latitude, locaction.longitude);
     var country  = loc[0].country;
    }
  }
Future<void>Notifications()async{
    AwesomeNotifications notify = AwesomeNotifications();
    if(await notify.isNotificationAllowed()){
      print("Handle Notifiys");
    }else{
      notify.requestPermissionToSendNotifications();
    }
}


Future<void> fetchDeviceToken()async{
print("attempting fetch");
   String? token = await firebase.getToken();
   print("token is $token");
}

@override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchDeviceToken();
    checkLocationPermission();
    Notifications();


  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Landing(),
    );
  }
}
