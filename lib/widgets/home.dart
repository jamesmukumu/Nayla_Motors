import 'package:flutter/material.dart';
import 'package:nayla_motor_car/pages/cars.dart';
import 'package:nayla_motor_car/widgets/categories.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
bool isLocalVehichlesExpanded = false;
bool isImported = false;
List<Widget> menuItems = [Cars(),CategoriesComp()];
int initialIdx = 0;

void changeNav(int newNav){
  setState(() {
    initialIdx = newNav;
  });
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
         child: Form(
           child: TextField(
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
               suffixIcon: Icon(Icons.search, color: Colors.grey),
               labelStyle: TextStyle(color: Colors.grey),
               hintText: "Search for any car eg,Toyota Hilux",
               hintStyle: TextStyle(color: Colors.grey),
             ),
           ),
         ),
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
      NavigationDestination(icon: Icon(Icons.car_rental_sharp), label: "WishList"),

    ]);
  }
}

