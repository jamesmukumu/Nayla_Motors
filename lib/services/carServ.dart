import 'dart:convert';

import 'package:http/http.dart' as http;
import "package:nayla_motor_car/classes/carCatalog.dart";




String baseUrl = 'https://carshop-1.onrender.com';
class CarService{
  final Client = http.Client();
  Future<http.Response?> fetchCars(String carBrand)async{
try{
  final resp = await Client.get(Uri.parse(baseUrl + "/fetch/all"));
  return resp;
  
}catch(err){
  print(err);
}}

  Future<http.Response?> FetchCar(String Slug)async{
    try{
      var resp = await Client.get(Uri.parse(baseUrl + "/fetch/specific/car").replace(
        queryParameters: {
          "searchVector":Slug
        }
      ));
      return resp;
    }catch(err){
      print(err);
    }
    
  }
  Future<http.Response?> FetchCarImages(String Slug)async{
    try{
      var resp = await Client.get(Uri.parse(baseUrl + "/fetch/car/images").replace(
          queryParameters: {
            "slug":Slug
          }
      ));
      return resp;
    }catch(err){
      print(err);
    }
  }

  Future<http.Response?> FetchCarBrands(String categorySlug)async{
    try{
      var resp = await Client.get(Uri.parse(baseUrl + "/fetch/car/brand").replace(
          queryParameters: {
            "carName":categorySlug
          }
      ));
      return resp;
    }catch(err){
      print(err);
    }
  }
  
  Future<http.Response?> FilterNameWise(String searchSlug)async{
    try{
      var resp = await Client.get(Uri.parse(baseUrl + "/filter/cars/namewise").replace(
        queryParameters: {
          "carFilter":searchSlug
      }
      ));
      return resp;
    }catch(err){
      print(err);
    }}



  Future<http.Response?> FilterMulti(CarFilter filt)async{
    print(filt);
    try{
      var resp = await Client.post(Uri.parse(baseUrl + "/filter"),body: json.encode({
        "start_price":filt.start_price,
        "end_price":filt.end_price,
        "start_mileage":filt.start_mileage,
        "end_mileage":filt.end_mileage,
        "start_yom":filt.start_yom,
        "end_yom":filt.end_yom,
        "source":filt.source,
        "brand_name":filt.brand_name
      }),headers: {
        "Content-Type":"application/json"
      });
      return resp;
    }catch(err){
print(err);
    }

  }


}