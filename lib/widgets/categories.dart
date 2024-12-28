import 'package:flutter/material.dart';
import 'package:nayla_motor_car/classes/carCatalog.dart';





class CategoriesComp extends StatefulWidget {
  const CategoriesComp({super.key});

  @override
  State<CategoriesComp> createState() => _CategoriesCompState();
}

class _CategoriesCompState extends State<CategoriesComp> {
int selectedCarCategories = 0 ;
  List<CarCatalog> categories = [
    CarCatalog(CatalogName: "Saloons", childrenCars: [
      CarBranches(appearanceName: "Citreon", carName: "Citreon", carImage: "lib/assets/Citreon.png"),
      CarBranches(appearanceName: "Nissan", carName: "Nissan", carImage: "lib/assets/Nissan.jpeg"),
      CarBranches(appearanceName: "Peugeout", carName: "Peugeot", carImage: "lib/assets/peugeout.png"),
      CarBranches(appearanceName: "Hyundai", carName: "Hyundai", carImage: "lib/assets/hyundai.jpeg"),
      CarBranches(appearanceName: "Honda", carName: "Honda", carImage: "lib/assets/honda.jpeg"),
      CarBranches(appearanceName: "Mitsubishi", carName: "Mitsubishi", carImage: "lib/assets/mit.png"),
      CarBranches(appearanceName: "Toyota", carName: "Toyota", carImage: "lib/assets/toyota.png"),
      CarBranches(appearanceName: "Smart", carName: "Smart", carImage: "lib/assets/smart.png"),
      CarBranches(appearanceName: "SkyGo", carName: "Skygo", carImage: "lib/assets/Skygo.png"),
      CarBranches(appearanceName: "Volkswagen", carName: "Volkswagen", carImage: "lib/assets/volks.jpeg"),
      CarBranches(appearanceName: "Renault", carName: "Renault", carImage: "lib/assets/Renault.jpeg"),
    ]
    ),
    CarCatalog(CatalogName: "SUVS", childrenCars: [
      CarBranches(appearanceName: "Jaguar", carName: "Jaguar", carImage: "lib/assets/jaguar.jpeg"),
      CarBranches(appearanceName: "Jeep", carName: "Jeep", carImage: "lib/assets/jeep.jpeg"),
      CarBranches(appearanceName: "Volvo", carName: "Volvo", carImage: "lib/assets/Volvo.png"),
      CarBranches(appearanceName: "Kia", carName: "KIA", carImage: "lib/assets/kia.png"),
      CarBranches(appearanceName: "Lexus", carName: "Lexus", carImage: "lib/assets/lexus.png"),
      CarBranches(appearanceName: "Land Rover", carName: "Land rover", carImage: "lib/assets/land_rover.jpeg"),

    ]
    ),
    CarCatalog(CatalogName: "HatchBacks", childrenCars: [
      CarBranches(appearanceName: "Mazda", carName: "Mazda", carImage: "lib/assets/mazda.png"),
      CarBranches(appearanceName: "Mercedes", carName: "Mercedes", carImage: "lib/assets/mercedes_benz.jpeg"),
      CarBranches(appearanceName: "Audi", carName: "Audi", carImage: "lib/assets/audi.png"),
      CarBranches(appearanceName: "BMW", carName: "Bmw", carImage: "lib/assets/bmw.jpeg"),
      CarBranches(appearanceName: "Subaru", carName: "Subaru", carImage: "lib/assets/subaru.jpeg"),
      CarBranches(appearanceName: "Suzuki", carName: "Suzuki", carImage: "lib/assets/suzuki.png"),
      CarBranches(appearanceName: "Mini Cooper", carName: "Mini", carImage: "lib/assets/mini.png"),
    ]
    ),
    CarCatalog(CatalogName: "OffRoad", childrenCars: [
      CarBranches(appearanceName: "Isuzu", carName: "Isuzu", carImage: "lib/assets/isuzu.png"),
      CarBranches(appearanceName: "Ford", carName: "Ford", carImage: "lib/assets/Ford.jpeg"),

    ]
    ),
    CarCatalog(CatalogName: "Sporting", childrenCars: [
      CarBranches(appearanceName: "Rolls Royce", carName: "Rolls Royce", carImage: "lib/assets/rolls.jpeg"),
      CarBranches(appearanceName: "Bentley", carName: "Bentley", carImage: "lib/assets/bentley.jpeg"),
      CarBranches(appearanceName: "Ferarri", carName: "Ferarri", carImage: "lib/assets/ferarri.jpeg"),
      CarBranches(appearanceName: "Porsche", carName: "Porsche", carImage: "lib/assets/porsche.png"),
      CarBranches(appearanceName: "Dodge", carName: "Dodge", carImage: "lib/assets/dodge.jpeg"),
      CarBranches(appearanceName: "Lamborghini", carName: "Lamborghini", carImage: "lib/assets/Lambo.jpeg"),
      CarBranches(appearanceName: "Alfa Romeo", carName: "Alpha Romeo", carImage: "lib/assets/Romeo.jpeg"),
    ]
    ),
    CarCatalog(CatalogName: "Bikes", childrenCars: [
      CarBranches(appearanceName: "Kawasaki", carName: "Kawasaki", carImage: "lib/assets/kawasaki.png"),
      CarBranches(appearanceName: "E-Bikes", carName: "E-Bikes", carImage: "lib/assets/ebike.jpeg"),
      CarBranches(appearanceName: "Jincheng", carName: "Jincheng", carImage: "lib/assets/ferarri.jpeg"),

    ]
    ),


    CarCatalog(CatalogName: "Trucks", childrenCars: [
      CarBranches(appearanceName: "Ashok LeyLand", carName: "Ashok Leyland", carImage: "lib/assets/lay.jpeg"),
      CarBranches(appearanceName: "Tata", carName: "TATA", carImage: "lib/assets/Tata.png"),
      CarBranches(appearanceName: "Hino", carName: "Hino", carImage: "lib/assets/Hino.png"),
      CarBranches(appearanceName: "FAW", carName: "FAW", carImage: "lib/assets/FAW.png"),
    ]
    )
  ];

  @override
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          padding: EdgeInsets.all(10.0),
          width: 130.55,
          color: Colors.grey[200],
          child: ListView.builder(
            itemCount: categories.length,
            itemBuilder: (ctx, idx) {
              return Column(
                children: [
                  InkWell(
                    onTap: () {
                      setState(() {
                        selectedCarCategories = idx;
                      });
                    },
                    child: Stack(
                      children: [
                        Container(
                          padding: EdgeInsets.symmetric(vertical: 10),
                          color: Colors.transparent,
                          child: Row(
                            children: [
                              selectedCarCategories == idx
                                  ? Container(
                                width: 4,
                                height: 20,
                                color: Colors.brown,
                              )
                                  : SizedBox(width: 4),
                              SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  categories[idx].CatalogName,
                                  style: TextStyle(
                                    color: selectedCarCategories == idx
                                        ? Colors.brown
                                        : Colors.black,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  Divider(height: 1, color: Colors.grey),
                ],
              );
            },
          ),
        ),
          Flexible(
          child: GridView.builder(
            itemCount: categories[selectedCarCategories].childrenCars.length,
            gridDelegate:
            SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
            itemBuilder: (cyx, count) {
              final carCatalog =
              categories[selectedCarCategories].childrenCars[count];
              return Column(
                children: [
                  Flexible(
                    child:  InkWell(
                      child: Image(
                        height: 150.00,
                        image: AssetImage(carCatalog.carImage),
                      ),
                      onTap: (){
                        Navigator.of(context).pushNamed("/category",arguments: {
                          "category":categories[selectedCarCategories].childrenCars[count].carName
                        });
                      },
                    ),
                  ),
                  Text(carCatalog.appearanceName),
                ],
              );
            },
          ),
        ),
      ],
    );
  }

}
