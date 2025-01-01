import { Component,OnInit } from '@angular/core';
import { CarService } from '../../car-specific/fetchcar.service';
import { CarsService } from '../../services/cars.service';
import {MatTableDataSource} from "@angular/material/table"
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {Observable} from "rxjs"
import { map,startWith } from 'rxjs';


interface Brand{
  Brandname:string
  Brandimage:string
  }
@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent  implements OnInit{
myFormControl = new FormControl()
carSlugSearch:string = ''   
carsFetched:any
carCount?:number
rowsDisplayInfo = ["name","thumbnail","price"]
filtering:boolean = false
dataSource:any
fetched:boolean = false
lowEnd?:number 
highEnd?:number
startYr?:number 
endYr?:number 
startMileage?:number 
endMileage?:number 
filteredCar!:Observable<Brand[]> 

Brands:Brand[] = [
  {
  Brandname:"Audi",
  Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/audi.svg"
  },
  {
  Brandname:"Bmw",
  Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/bmw.svg"
  },
  {
    Brandname:"Mercedes",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/mercedes.svg"
  },
  {
    Brandname:"Subaru",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/subaru.svg"
  },
  {
    Brandname:"Nissan",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/nissan.svg"
  },
  {
    Brandname:"Toyota",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/toyota.svg"
  },
  {
    Brandname:"Land rover",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/land_rover.svg"
  },
  {
    Brandname:"Lexus",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/lexus.svg"
  },
  {
    Brandname:"Suzuki",
    Brandimage:"data:image/png;base64,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"
  },
  {
    Brandname:"Volkswagen",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/VW.svg"
  },
  {
    Brandname:"Honda",
    Brandimage:"https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/icons/carBrands/honda.svg"
  },
  {
    Brandname:"Mitsubishi",
    Brandimage:"data:image/png;base64,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"
  },
  {
    Brandname:"Bentley",
    Brandimage:"../../../assets/bentley.jpeg"
  },
  {
    Brandname:"Ashok Leyland",
    Brandimage:"../../../assets/lay.jpeg"
  },
  {
    Brandname:"Chevrolet",
    Brandimage:"../../../assets/chevrolet.jpeg"
  },
  {
    Brandname:"Citreon",
    Brandimage:"../../../assets/Citreon.png"
  },
  {
    Brandname:"Dodge",
    Brandimage:"../../../assets/dodge.jpeg"
  },
  {
    Brandname:"E Bike",
    Brandimage:"../../../assets/ebike.jpeg"
  },
  {
    Brandname:"FAW",
    Brandimage:"../../../assets/FAW.png"
  },
  {
    Brandname:"Ferrari",
    Brandimage:"../../../assets/ferarri.jpeg"
  },
  {
    Brandname:"Ford",
    Brandimage:"../../../assets/Ford.jpeg"
  },
  {
    Brandname:"Hyundai",
    Brandimage:"../../../assets/hyundai.jpeg"
  },
  {
    Brandname:"Isuzu",
    Brandimage:"../../../assets/isuzu.png"
  },
  {
    Brandname:"Jaguar",
    Brandimage:"../../../assets/jaguar.jpeg"
  },
  {
    Brandname:"Jeep",
    Brandimage:"../../../assets/jeep.jpeg"
  },
  {
    Brandname:"Jincheng",
    Brandimage:""
  },
  {
    Brandname:"KIA",
    Brandimage:"../../../assets/kia.png"
  },  
  {
    Brandname:"Kawasaki",
    Brandimage:"../../../assets/kawasaki.png"
  },  
  {
    Brandname:"Lamborghini",
    Brandimage:"../../../assets/Lambo.jpeg"
  }, 
  {
    Brandname:"Mini",
    Brandimage:"../../../assets/mini.png"
  },   
  {
    Brandname:"Nissan",
    Brandimage:"../../../assets/Nissan.jpeg"
  },  
  {
    Brandname:"Peugeot",
    Brandimage:"../../../assets/peugeout.png"
  },  
  {
    Brandname:"Porsche",
    Brandimage:"../../../assets/porsche.png"
  },  
  {
    Brandname:"Renault",
    Brandimage:"../../../assets/Renault.jpeg"
  },  
  {
    Brandname:"Skygo",
    Brandimage:"../../../assets/Skygo.png"
  },  
  {
    Brandname:"Smart",
    Brandimage:"../../../assets/Skygo.png"
  }, 
  {
    Brandname:"Volvo",
    Brandimage:"../../../assets/Volvo.png"
  },  
  {
    Brandname:"TATA",
    Brandimage:"../../../assets/Tata.png"
  }, 
  ]

filterbyPrice(lowPrice:number,maxPrice:number){
  this.cdr.detectChanges()
 
  this.router.navigate(["filtered/cars"],{
  queryParams:{
  'minimumPrice':lowPrice,
  'maximumPrice':maxPrice,
  "filterBy":"pricewise"
  }
  })
  }
  filterbyYear(){
    this.cdr.detectChanges()
   this.router.navigate(["filtered/cars"],{
    queryParams:{
    'startYear':this.startYr,
    'endYear':this.endYr,
    "filterBy":"yearwise"
    }
    })
    }
    fetchcardBrand(brand:string){
      this.router.navigate(["filtered/cars"],{
      queryParams:{
      "carBrand":brand,
      "filterBy":"brandSearch"
      }
      })
      
      }
    filterbyMileage(){
      this.cdr.detectChanges()
     this.router.navigate(["filtered/cars"],{
      queryParams:{
      'startMileage':this.startMileage,
      'endMileage':this.endMileage,
      "filterBy":"mileage"
      }
      })
      }
  
formatPrice(price:number){
  var priceStringform:string = price.toString()
  priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
  return priceStringform
  }
  navigateTospecificcar(vectorSearch:string){
    console.log("this is the vector",vectorSearch)
    this.router.navigate(["/car",vectorSearch])
    }
async fetchingCars(){
this.filtering = true
var resp:any = await this.cars.FetchSlug(this.carSlugSearch)
var {count,data} = resp
console.log(data)
if(data.length  > 0 ){
  this.fetched = true
  this.carCount = count
  this.dataSource = new MatTableDataSource(data)
  
}




}
constructor(private cars:CarsService,private router:Router,private cdr:ChangeDetectorRef){}   

private _filter(value: string): Brand[] {
  const filterValue = value.toLowerCase();

return this.Brands.filter(option => option.Brandname.toLowerCase().includes(filterValue));
    }
ngOnInit(){
this.filteredCar = this.myFormControl.valueChanges.pipe(
  startWith(""),
  map((val)=>this._filter(val || ""))
)

}
}
