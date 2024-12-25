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
}

  }




}