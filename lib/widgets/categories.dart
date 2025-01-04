import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:nayla_motor_car/classes/carCatalog.dart';
import 'package:nayla_motor_car/classes/carCatalog.dart';
import 'package:nayla_motor_car/services/carServ.dart';




class CategoriesComp extends StatefulWidget {
  const CategoriesComp({super.key});

  @override
  State<CategoriesComp> createState() => _CategoriesCompState();
}

class _CategoriesCompState extends State<CategoriesComp> {
  RangeValues filterValues = RangeValues(250000, 100000000);
  TextEditingController startPrice = TextEditingController();
  TextEditingController endPrice = TextEditingController();

 List<String> allCars = [];

  void validator(){

  }

  void populateCars() {
    final carSet = <String>{};
    for (int i = 0; i < categories.length; i++) {
      for (int j = 0; j < categories[i].childrenCars.length; j++) {
        carSet.add(categories[i].childrenCars[j].carName);
      }
    }
    setState(() {
      allCars = carSet.toList();
      selectedFilterCar = allCars.isNotEmpty ? allCars[0] : ''; // Ensure valid default value
    });
  }


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
Set <String>_choosenVals = {};
String selectedFilterCar = 'Hino';
  @override

  void initState() {
    // TODO: implement initState
    super.initState();
    startPrice.addListener(validator);
    endPrice.addListener(validator);
    populateCars();
  }
  @override
  Widget build(BuildContext context) {
    RangeLabels labelsRange = RangeLabels(filterValues.start.toString(),this.filterValues.end.toString());
    return     Stack(
      children: [
        Row(
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
        ),

       Positioned(
         bottom: 0.00000,
         child: SegmentedButton<String>(
           style: ButtonStyle(
             textStyle: MaterialStateProperty.all(TextStyle(
               color: Colors.white
             )),
             backgroundColor: MaterialStateProperty.all(Colors.brown[400])
           ),
             emptySelectionAllowed: true,
             segments:[
           ButtonSegment(value: "Filter",icon: IconButton(onPressed: (){
          showModalBottomSheet(context: context, builder: (ctx){
            return Mode(startPrice: startPrice, endPrice: endPrice, allCars: allCars, filterValues: filterValues, labelsRange: labelsRange, selectedFilterCar: selectedFilterCar);
          });

           }, icon: Icon(Icons.filter_alt,color: Colors.white,),),label: Text("Filter",style: TextStyle(
             color: Colors.white
           ),)),
           ButtonSegment(value: "Sort",icon: IconButton(onPressed: (){}, icon: Icon(Icons.sort,color: Colors.white,)),label: Text("Sort",style: TextStyle(
             color: Colors.white
           ),))

         ] , selected:_choosenVals ),
       )

      ],
    );
  }

}



class Mode extends StatefulWidget {
  Mode({super.key,required this.startPrice,required this.endPrice,required this.allCars,required this.filterValues,required this.labelsRange,required this.selectedFilterCar});
TextEditingController startPrice;
Future<void> ?fetchingBasedFilter;
TextEditingController endPrice;
  TextEditingController startYOM = TextEditingController();
  TextEditingController endYOM = TextEditingController();
  TextEditingController startMileage = TextEditingController();
  TextEditingController endMileage = TextEditingController();
  CarService carServ = CarService();
List<String> allCars;
RangeValues filterValues;
RangeLabels labelsRange;
String selectedFilterCar;
String defaultMarketPlace = "Kenyan Used";
  @override
  State<Mode> createState() => _ModeState();
}

class _ModeState extends State<Mode> {
  @override
  Widget build(BuildContext context) {
    return  SingleChildScrollView(
      child: Form(child: Column(
      
        children: [
          DropdownButton<String>(
            hint: Text('Choose car to filter'),
            menuWidth: double.infinity,
            value: widget.selectedFilterCar.isNotEmpty ? widget.selectedFilterCar : null, // Avoid null error
            items: widget.allCars.toSet().map((data) => DropdownMenuItem<String>(
              value: data,
              child: Text(data),
            )).toList(),
            onChanged: (newValue) {
              setState(() {
                widget.selectedFilterCar = newValue ?? '';
              });
            },
          ),
      
          DropdownButton(
            value: widget.defaultMarketPlace,
              items: [
            DropdownMenuItem(child: Text("Kenyan Used"),value: "Kenyan Used",),
            DropdownMenuItem(child: Text("Foreign Used"),value: "Foreign Used",),
          ], onChanged: (newVal){
               setState(() {
                 widget.defaultMarketPlace =  newVal!;
               });
          }),
      
      
          Text("Filter Price wise"),
          Center(
            child: RangeSlider(activeColor: Colors.brown[400],inactiveColor: Colors.brown[400],max: 100000000,min: 250000,divisions: 5,values: widget.filterValues,labels: widget.labelsRange, onChanged:(newVal){
              setState(() {
                widget.filterValues = newVal;
                widget.labelsRange = RangeLabels(newVal.start.toString(), newVal.end.toString());
              });
              widget.startPrice.text = newVal.start.toString();
              widget.endPrice.text = newVal.end.toString();
      
            }),
          ),
          Row(
            children: [
              Flexible(
                child: TextField(
                  decoration: InputDecoration(
                      label: Text("Start Price"),
                      border: OutlineInputBorder(
                          borderSide: BorderSide(
      
                          )
                      )
                  ),
                  controller: widget.startPrice,
                  keyboardType: TextInputType.number,
      
                ),
              ),
              Flexible(
                child: TextField(
      
                  decoration: InputDecoration(
                      label: Text("Ending Price"),
                      border: OutlineInputBorder(
                          borderSide: BorderSide(
      
                          )
                      )
                  ),
                  controller: widget.endPrice,
                  keyboardType: TextInputType.number,
                ),
              ),
            ],
          ),
      
      
          Text("Filter By Year of Manufacture"),
          Row(
            children: [
              Flexible(
                child: TextField(
                  controller: widget.startYOM,
                  decoration: InputDecoration(
                      label: Text("Start YOM"),
                      border: OutlineInputBorder(
                          borderSide: BorderSide(
      
                          )
                      )
                  ),
      
                  keyboardType: TextInputType.number,
                  maxLength: 4,
      
                ),
              ),
              Flexible(
                child: TextField(
                  controller: widget.endYOM,
                  decoration: InputDecoration(
                      label: Text("End YOM"),
                      border: OutlineInputBorder(
                          borderSide: BorderSide(
      
                          )
                      )
                  ),
      
                  keyboardType: TextInputType.number,
                  maxLength: 4,
                ),
              ),
            ],
          ),
      
          Text("Filter By Mileage"),
          Row(
            children: [
              Flexible(
                child: TextField(
                  controller: widget.startMileage,
                  decoration: InputDecoration(
                      label: Text("Start Mileage"),
                      border: OutlineInputBorder(
                          borderSide: BorderSide(
      
                          )
                      )
                  ),
      
                  keyboardType: TextInputType.number,
      
                ),
              ),
              Flexible(
                child: TextField(
      controller: widget.endMileage,
                  decoration: InputDecoration(
                      label: Text("End Mileage"),
                      border: OutlineInputBorder(
                          borderSide: BorderSide(
      
                          )
                      )
                  ),
      
                  keyboardType: TextInputType.number,
                ),
              ),
            ],
          ),
          FutureBuilder(future: widget.fetchingBasedFilter, builder: (ctx,snap){
            if(snap.connectionState == ConnectionState.done){
            return TextButton(onPressed: (){}, child: Row(
              children: [
                Text("Filtering..."),
                CircularProgressIndicator(),
              ],
            ));



            }else{
              return

                TextButton.icon(
                  icon: Icon(Icons.filter_alt, color: Colors.white),
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.brown[400]),
                  ),
                  onPressed: () {
                    try {
                      CarFilter pay = CarFilter(
                        brand_name: widget.selectedFilterCar,
                        source: widget.defaultMarketPlace,
                        start_price: widget.startPrice.text.isNotEmpty
                            ? int.parse(widget.startPrice.text)
                            : null,
                        end_price: widget.endPrice.text.isNotEmpty
                            ? int.parse(widget.endPrice.text)
                            : null,
                        start_yom: widget.startYOM.text.isNotEmpty
                            ? int.parse(widget.startYOM.text)
                            : null,
                        end_yom: widget.endYOM.text.isNotEmpty
                            ? int.parse(widget.endYOM.text)
                            : null,
                        start_mileage: widget.startMileage.text.isNotEmpty
                            ? int.parse(widget.startMileage.text)
                            : null,
                        end_mileage: widget.endMileage.text.isNotEmpty
                            ? int.parse(widget.endMileage.text)
                            : null,
                      );

                      widget.fetchingBasedFilter = widget.carServ.FilterMulti(pay).then((data){
                        print(data!.body);
                        dynamic dataBody = json.decode(data!.body);
                        if(dataBody['data'] == 'Results not found'){
                          Navigator.pop(context);
                          ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text("Cars not found based on filter"),showCloseIcon: true,duration: Duration(seconds: 10),)
                          );
                        }else{
                          String dataa = json.encode(dataBody['data']);
                          Navigator.pushNamed(context, "/filter",arguments: {
                            "data":dataa
                          });
                        }



                      });

                    } catch (e) {
                      print('Error: $e');
                    }
                  },
                  label: Text(
                    'Filter',
                    style: TextStyle(color: Colors.white, letterSpacing: 1.55),
                  ),
                );

            }

          })

        ],
      
      
      )
      
      ),
    );;
  }
}
