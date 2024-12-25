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
      CarBranches(appearanceName: "Citreon", carName: "", carImage: "lib/assets/Citreon.png"),
      CarBranches(appearanceName: "Nissan", carName: "", carImage: "lib/assets/Nissan.jpeg"),
      CarBranches(appearanceName: "Peugeout", carName: "", carImage: "lib/assets/peugeout.png"),
      CarBranches(appearanceName: "Hyundai", carName: "", carImage: "lib/assets/hyundai.jpeg"),
      CarBranches(appearanceName: "Honda", carName: "", carImage: "lib/assets/honda.jpeg"),
      CarBranches(appearanceName: "Mitsubishi", carName: "", carImage: "lib/assets/mit.png"),
      CarBranches(appearanceName: "Toyota", carName: "", carImage: "lib/assets/toyota.png"),
      CarBranches(appearanceName: "Smart", carName: "", carImage: "lib/assets/smart.png"),
      CarBranches(appearanceName: "SkyGo", carName: "", carImage: "lib/assets/Skygo.png"),
      CarBranches(appearanceName: "Volkswagen", carName: "", carImage: "lib/assets/volks.jpeg"),
      CarBranches(appearanceName: "Renault", carName: "", carImage: "lib/assets/Renault.jpeg"),
    ]
    ),
    CarCatalog(CatalogName: "SUVS", childrenCars: [
      CarBranches(appearanceName: "Jaguar", carName: "", carImage: "lib/assets/jaguar.jpeg"),
      CarBranches(appearanceName: "Jeep", carName: "", carImage: "lib/assets/jeep.jpeg"),
      CarBranches(appearanceName: "Volvo", carName: "", carImage: "lib/assets/Volvo.png"),
      CarBranches(appearanceName: "Kia", carName: "", carImage: "lib/assets/kia.png"),
      CarBranches(appearanceName: "Lexus", carName: "", carImage: "lib/assets/lexus.png"),
      CarBranches(appearanceName: "Land Rover", carName: "", carImage: "lib/assets/land_rover.jpeg"),

    ]
    ),
    CarCatalog(CatalogName: "HatchBacks", childrenCars: [
      CarBranches(appearanceName: "Mazda", carName: "", carImage: "lib/assets/mazda.png"),
      CarBranches(appearanceName: "Mercedes", carName: "", carImage: "lib/assets/mercedes_benz.jpeg"),
      CarBranches(appearanceName: "Audi", carName: "", carImage: "lib/assets/audi.png"),
      CarBranches(appearanceName: "BMW", carName: "", carImage: "lib/assets/bmw.jpeg"),
      CarBranches(appearanceName: "Subaru", carName: "", carImage: "lib/assets/subaru.jpeg"),
      CarBranches(appearanceName: "Suzuki", carName: "", carImage: "lib/assets/suzuki.png"),
      CarBranches(appearanceName: "Mini Cooper", carName: "", carImage: "lib/assets/mini.png"),
    ]
    ),
    CarCatalog(CatalogName: "OffRoad", childrenCars: [
      CarBranches(appearanceName: "Isuzu", carName: "", carImage: "lib/assets/isuzu.png"),
      CarBranches(appearanceName: "Ford", carName: "", carImage: "lib/assets/Ford.jpeg"),

    ]
    ),
    CarCatalog(CatalogName: "Sporting", childrenCars: [
      CarBranches(appearanceName: "Rolls Royce", carName: "", carImage: "lib/assets/rolls.jpeg"),
      CarBranches(appearanceName: "Bentley", carName: "", carImage: "lib/assets/bentley.jpeg"),
      CarBranches(appearanceName: "Ferarri", carName: "", carImage: "lib/assets/ferarri.jpeg"),
      CarBranches(appearanceName: "Porsche", carName: "", carImage: "lib/assets/porsche.png"),
      CarBranches(appearanceName: "Dodge", carName: "", carImage: "lib/assets/dodge.jpeg"),
      CarBranches(appearanceName: "Lamborghini", carName: "", carImage: "lib/assets/Lambo.jpeg"),
      CarBranches(appearanceName: "Alfa Romeo", carName: "", carImage: "lib/assets/Romeo.jpeg"),
    ]
    ),
    CarCatalog(CatalogName: "Bikes", childrenCars: [
      CarBranches(appearanceName: "Kawasaki", carName: "", carImage: "lib/assets/kawasaki.png"),
      CarBranches(appearanceName: "E-Bikes", carName: "", carImage: "lib/assets/ebike.jpeg"),
      CarBranches(appearanceName: "Jincheng", carName: "", carImage: "lib/assets/ferarri.jpeg"),

    ]
    ),


    CarCatalog(CatalogName: "Trucks", childrenCars: [
      CarBranches(appearanceName: "Ashok LeyLand", carName: "", carImage: "lib/assets/lay.jpeg"),
      CarBranches(appearanceName: "Tata", carName: "", carImage: "lib/assets/Tata.png"),
      CarBranches(appearanceName: "Hino", carName: "", carImage: "lib/assets/Hino.png"),
      CarBranches(appearanceName: "FAW", carName: "", carImage: "lib/assets/FAW.png"),
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
                    child: Image(
                      height: 150.00,
                      image: AssetImage(carCatalog.carImage),
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
