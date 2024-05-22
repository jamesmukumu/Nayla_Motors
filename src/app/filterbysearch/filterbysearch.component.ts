import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'filterbysearch',
  templateUrl: './filterbysearch.component.html',
  styleUrl: './filterbysearch.component.css',
 
})
export class FilterbysearchComponent {
  Minimumprice:number | any
  Maxprice:number = 0
  choosenCar:string =''
  currency:string = ""
  seeButton:boolean = false
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
Currencies:string[] =["USD","KES","JPY","GPB"]

constructor(private router:Router){}


testSearch(){
console.log("this is the min price",this.Minimumprice)
console.log("the car choose is",this.Maxprice)

console.log("the car choosen is",this.choosenCar)
this.router.navigate(["filtered/cars"],{queryParams:{
'maximumPrice':this.Maxprice,
'minimumPrice':this.Minimumprice,
"carBrand":this.choosenCar,
"currency":this.currency
}})
}

filterby500K(){
this.router.navigate(["filtered/cars"],{
queryParams:{
'maximumPrice':0,
'minimumPrice':500000,
}
})
}
filterby1milli(){
  this.router.navigate(["filtered/cars"],{
  queryParams:{
  'maximumPrice':0,
  'minimumPrice':1000000,
  }
  })
  }

  filterby5M(){
    this.router.navigate(["filtered/cars"],{
    queryParams:{
    'maximumPrice':0,
    'minimumPrice':5000000,
    }
    })
    }

    filterby10M(){
      this.router.navigate(["filtered/cars"],{
      queryParams:{
      'maximumPrice':0,
      'minimumPrice':1000000,
      }
      })
      }

      filterBysearch(){
        console.log("the choose car is",this.choosenCar)
      this.router.navigate(["filtered/cars"],{
      queryParams:{
      "carQuery":this.choosenCar
      }
      })

      }

}
