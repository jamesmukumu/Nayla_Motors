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
        title: Text("Home",style: TextStyle(
          letterSpacing: 1.55,
          color: Colors.white
        ),),
        centerTitle: true,
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

