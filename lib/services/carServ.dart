import 'package:http/http.dart' as http;
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
    }
    
    
  }



}