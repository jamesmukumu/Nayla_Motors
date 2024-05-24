import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'filterbysearch',
  templateUrl: './filterbysearch.component.html',
  styleUrl: './filterbysearch.component.css',
 
})
export class FilterbysearchComponent {
  Minimumprice:number | any
  Maxprice:number | any
  choosenCar:string =''
  currency:string = ""
  typeQuery:string = ""
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
"currency":this.currency,
"filterBy":"advanced search"
}})
}

filterby500K(){
this.router.navigate(["filtered/cars"],{
queryParams:{
'minimumPrice':0,
'maximumPrice':500000,
"filterBy":"pricewise"
}
})
}
filterby1milli(){
  this.router.navigate(["filtered/cars"],{
  queryParams:{
  'minimumPrice':500000,
  'maximumPrice':1000000,
  "filterBy":"pricewise"
  }
  })
  }

  filterby5M(){
    this.router.navigate(["filtered/cars"],{
    queryParams:{
    'minimumPrice':100000,
    'maximumPrice':5000000,
    "filterBy":"pricewise"
    }
    })
    }

    filterby10M(){
      this.router.navigate(["filtered/cars"],{
      queryParams:{
      'minimumPrice':5000000,
      'maximumPrice':10000000,
      "filterBy":"pricewise"
      }
      })
      }
      filterby100M(){
        this.router.navigate(["filtered/cars"],{
        queryParams:{
        'minimumPrice':10000000,
        'maximumPrice':1000000000,
        "filterBy":"pricewise"
        }
        })
        }

      filterBysearch(){
        console.log("the choose car is",this.typeQuery)
      this.router.navigate(["filtered/cars"],{
      queryParams:{
      "carQuery":this.typeQuery,
      "filterBy":"manualSearch"
      }
      })

      }

}
