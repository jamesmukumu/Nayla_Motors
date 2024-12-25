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