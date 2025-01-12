import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:nayla_motor_car/pages/cars.dart';
import 'package:nayla_motor_car/pages/wishlist/wishlist.dart';
import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';
import 'package:nayla_motor_car/services/carServ.dart';
import 'package:nayla_motor_car/widgets/categories.dart';
import 'dart:convert';
class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
bool isLocalVehichlesExpanded = false;
bool isImported = false;
List<Widget> menuItems = [Cars(),CategoriesComp(),Wish()];
int initialIdx = 0;
CarService car = CarService();
List<dynamic> carData = [];
TextEditingController searchSlug = TextEditingController();
 Future<void>? filteringSlug;
void changeNav(int newNav){
  setState(() {
    initialIdx = newNav;
  });
}



void validator(){}
@override
  void initState() {
    // TODO: implement initState
    super.initState();
    searchSlug.addListener(validator);
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
body: menuItems[initialIdx],
       drawer:  Drawer(
         child: ListView(
           children: [
Row(
  children: [
    Text("Local Cars"),
    ExpandIcon(isExpanded: isLocalVehichlesExpanded,onPressed: (bool exp){
      setState(() {
        isLocalVehichlesExpanded = !exp;
      });
    })
  ],
),

             Divider(),
             if(isLocalVehichlesExpanded)Column(
               children: [
                 ListTile(
                   title: Text("Locally Used"),
                 )
               ],
             )else SizedBox(height: 10.0,),
             Divider(),

             Row(
               children: [
                 Text("Imported Cars"),
                 ExpandIcon(isExpanded: isImported,onPressed: (bool exp){
                   setState(() {
                     isImported = !exp;
                   });
                 })
               ],
             ),

             if(isImported)Column(
               children: [
                 ListTile(
                   title: Text("Foreign  Used Cars"),
                 )
               ],
             )else SizedBox(height: 10.0,),
             Divider(),
             ListTile(
               title: Text("Sell Your Car"),
             ),
             Divider(),
             ListTile(
               title: Text("About us"),
             ),
             Divider(),
             ListTile(
               title: Text("Contact Us"),
             ),
           ],

         ),
       ),
      appBar: AppBar(
        backgroundColor: Colors.brown.shade400,
       title: Container(
         height: 40, // Adjust height to align properly
         child:FutureBuilder(future: filteringSlug, builder: (ctx,snap){
           if(snap.connectionState == ConnectionState.done){
             return Autocomplete<String>(optionsBuilder: (TextEditingValue carSlug){
               if (carSlug.text.isEmpty) {
                 return Iterable<String>.empty();
               }

               return carData.where((carInfo) {
                 final carName = carInfo["name"];
                 return carName is String && carName.toLowerCase().contains(carSlug.text.toLowerCase());
               })
                   .map<String>((carInfoo) => carInfoo["name"].toString());





             },
               optionsViewBuilder: (BuildContext context, AutocompleteOnSelected<String> onSelected, Iterable<String> options) {
                 return SizedBox(
                   width: double.maxFinite,
                   child: Card(

                     child: ListView(
                       shrinkWrap: true,
                       children: options.map((String deviceName) {

                         final carInfo = carData.firstWhere((cr) => cr["name"] == deviceName);

                         return  ListTile(
                           title: Text(
                             deviceName,
                             maxLines: 1,
                             overflow: TextOverflow.ellipsis,
                             style: TextStyle(
                                 fontSize: 14.5,
                                 decoration: TextDecoration.underline
                             ),
                           ),
                           subtitle: Wrap(
                             direction: Axis.horizontal,
                             children: [
                               Image(image: NetworkImage(carInfo["thumbnail"]),height: 150,width:150,errorBuilder: (ctx,obj,trace){
                                 return Image(image: AssetImage("lib/assets/naylamotors.webp"),height: 150,width: 150,);
                               },),
                               Text("KES "+carInfo["price"].toString().replaceAll(RegExp(r'\B(?=(\d{3})+(?!\d))'),","),style: TextStyle(
                                   letterSpacing: 2.5
                               ),),
                             ],
                           ),
                           onTap: () {
                             Navigator.pushNamed(context, "/car",arguments: {
                               "carSlug":carInfo["slug"]
                             });
                           },
                         );
                       }).toList(),
                     ),
                   ),
                 );
               },
               fieldViewBuilder: (ctx,edit,node,cb){
               return   TextField(
                 controller: edit,
                 focusNode: node,
                 decoration: InputDecoration(
                   contentPadding: EdgeInsets.symmetric(vertical: 8.0),
                   filled: true,
                   fillColor: Colors.white,
                   focusColor: Colors.white,
                   focusedBorder: OutlineInputBorder(
                     borderRadius: BorderRadius.horizontal(),
                     borderSide: BorderSide(color: Colors.white),
                   ),
                   border: OutlineInputBorder(
                     borderRadius: BorderRadius.horizontal(),
                     borderSide: BorderSide(color: Colors.white),
                   ),

                   labelStyle: TextStyle(color: Colors.grey),
                   hintText: "Search for any car eg,Toyota Hilux",
                   hintStyle: TextStyle(color: Colors.grey),
                 ),
               );
               },

             );
           }else{
          return Form(
           child:    TextField(
           controller: searchSlug,
           decoration: InputDecoration(
           contentPadding: EdgeInsets.symmetric(vertical: 8.0),
           filled: true,
           fillColor: Colors.white,
           focusColor: Colors.white,
           focusedBorder: OutlineInputBorder(
           borderRadius: BorderRadius.horizontal(),
           borderSide: BorderSide(color: Colors.white),
           ),
           border: OutlineInputBorder(
           borderRadius: BorderRadius.horizontal(),
           borderSide: BorderSide(color: Colors.white),
           ),
           suffixIcon: IconButton(onPressed: (){
             filteringSlug = car.FilterNameWise(searchSlug.text).then((data){
               dynamic info = json.decode(data!.body);
               setState(() {
                 carData =  info['data'];
               });
             });
           }, icon: Icon(Icons.search, color: Colors.grey)),
           labelStyle: TextStyle(color: Colors.grey),
           hintText: "Search for any car eg,Toyota Hilux",
           hintStyle: TextStyle(color: Colors.grey),
           ),
           ),
           );
           }

         })
       ),
      ),

    

bottomNavigationBar: BottomNav(changeItem: changeNav, currentIdx: initialIdx),
    );
  }
}



class BottomNav extends StatelessWidget {
final int currentIdx;
final ValueChanged<int> changeItem;

  const BottomNav({super.key,required this.changeItem,required this.currentIdx});

  @override
  Widget build(BuildContext context) {
    return  StoreConnector<CarRed,List<String>>(
      converter: (state)=>state.state.carSlugs,
      builder: (ctx,carsSlug){
      return NavigationBar(
          selectedIndex: currentIdx,
          onDestinationSelected: (idx){
            changeItem(idx);
          },
          indicatorColor: Colors.brown.shade200,
          backgroundColor: Colors.white,
          destinations: [
            NavigationDestination(icon: Icon(Icons.home), label: "Home"),
            NavigationDestination(icon: Icon(Icons.category), label: "Categories"),
            NavigationDestination(icon: Badge.count(count: carsSlug.length,child: Icon(Icons.car_rental_sharp),), label: "WishList"),

          ]);
      },

    );
  }
}

