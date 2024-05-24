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
},
{
  Brandname:"Mitsubishi",
  Brandimage:"data:image/png;base64,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"
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
