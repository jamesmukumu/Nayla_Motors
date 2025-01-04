class CarCatalog{
String CatalogName;
List<CarBranches> childrenCars;
CarCatalog({required this.CatalogName,required this.childrenCars});
}
class CarBranches{
  String carName;
  String carImage;
  String appearanceName;
  CarBranches({required this.appearanceName,required this.carName,required this.carImage});
}


class CarFilter {
  int ?start_price;
  int ?end_price;
  int ?start_mileage;
  int ?end_mileage;
  int ?start_yom;
  int ?end_yom;
  String brand_name;
  String source;
CarFilter({required this.brand_name,required this.source,this.start_price,this.start_yom,this.end_mileage,this.end_price,this.end_yom,this.start_mileage});

}