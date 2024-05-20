import { Component } from '@angular/core';
 import { trigger,transition,style,animate } from '@angular/animations';
@Component({
  selector: 'filterbysearch',
  templateUrl: './filterbysearch.component.html',
  styleUrl: './filterbysearch.component.css',
  animations:[
  trigger("click",[
  transition("void=>*",[
    style({backgroundColor:"yellow",opacity:0}),
    animate(4000, style({backgroundColor:"green",opacity:1})),
  ])

  ])
  ]
})
export class FilterbysearchComponent {
Vehichlebrands:string[]= [
  "Toyota",
  "Nissan",
  "Mitsubishi",
  "Subaru",
  "Honda",
  "Mazda",
  "Isuzu",
  "Mercedes-Benz",
  "BMW",
  "Volkswagen",
  "Ford",
  "Land Rover",
  "Range Rover",
  "Lexus",
  "Jeep",
  "Audi",
  "Hyundai",
  "Kia",
  "Suzuki",
  "Peugeot"
]
Currencies:string[] =["USD","KSH","JPY","GPB"]

}
