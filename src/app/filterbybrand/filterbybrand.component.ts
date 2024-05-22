import { Component } from '@angular/core';
import { Router } from '@angular/router';
 interface Brand{
  Brandname:string
  Brandimage:string
  }



@Component({
  selector: 'filterbybrand',
  templateUrl: './filterbybrand.component.html',
  styleUrl: './filterbybrand.component.css'
})

export class FilterbybrandComponent {

   
Brands:Brand[] = [
{
Brandname:"Audi",
Brandimage:"https://www.kaiandkaro.com/images/brands/audi.svg"
},
{
Brandname:"BMW",
Brandimage:"https://www.kaiandkaro.com/images/brands/bmw.svg"
},
{
  Brandname:"Mercedes",
  Brandimage:"https://www.kaiandkaro.com/images/brands/mercedes.svg"
},
{
  Brandname:"Subaru",
  Brandimage:"https://www.kaiandkaro.com/images/brands/subaru.svg"
},
{
  Brandname:"Nissan",
  Brandimage:"https://www.kaiandkaro.com/images/brands/nissan.svg"
},
{
  Brandname:"Toyota",
  Brandimage:"https://www.kaiandkaro.com/images/brands/toyota.svg"
},
{
  Brandname:"Land rover",
  Brandimage:"https://www.kaiandkaro.com/images/brands/land_rover.svg"
},
{
  Brandname:"Lexus",
  Brandimage:"https://www.kaiandkaro.com/images/brands/lexus.svg"
},
{
  Brandname:"Volkswagen",
  Brandimage:"https://www.kaiandkaro.com/images/brands/VW.svg"
},
{
  Brandname:"Honda",
  Brandimage:"https://www.kaiandkaro.com/images/brands/honda.svg"
}



]
brandName:string = ''
showBrand:boolean = false
showBrandname(name:string){
this.brandName =  name
this.showBrand = true
}

constructor(private route:Router){}
fetchcardBrand(brand:string){
this.route.navigate(["filtered/cars"],{
queryParams:{
"carBrand":brand,
"filterBy":"brandSearch"
}
})

}


}
