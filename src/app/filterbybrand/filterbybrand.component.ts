import { Component } from '@angular/core';
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
  Brandname:"Mercedes Benz",
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
]
brandName:string = ''
showBrand:boolean = false
showBrandname(name:string){
this.brandName =  name
this.showBrand = true
}


}
