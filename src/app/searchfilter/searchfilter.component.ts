import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FiltercarsService } from './search.sevice';


@Component({
  selector: 'searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrl: './searchfilter.component.css'
})


export class SearchfilterComponent implements OnInit {
maxPrice:string= ""
minPrice:string = ""
brand:string = ''
currency:string = ''
possibleButtons:string = 'available'
data:any   
Resultsnotfound:boolean = false
fetched:boolean = false

msg:any = [{
"severity":"warn",
"detail":"Result not found"
}
]
   //

constructor(private myroute:ActivatedRoute,public Route:Router){
  
console.log(this.myroute.snapshot.queryParams)
this.maxPrice = this.myroute.snapshot.queryParams["maximumPrice"]
this.minPrice = this.myroute.snapshot.queryParams["minimumPrice"]
this.brand = this.myroute.snapshot.queryParams["carBrand"]
this.currency = this.myroute.snapshot.queryParams["currency"]

}



async ngOnInit(){
var carFetch = new FiltercarsService()
this.data = await carFetch.Fetchcars(this.minPrice,this.maxPrice,this.brand,this.currency)
console.log(this.data)
if (this.data === "Results not found"){
this.Resultsnotfound = true
return
}
this.fetched = true
console.log(this.Resultsnotfound)
}


validateButton(btnAvailability:string){
  if(btnAvailability == this.possibleButtons){
  return true
  }else{
  return false
  }
  }
  formatPrice(price:number){
  var priceStringform:string = price.toString()
  priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  console.log("the car price",priceStringform)
  return priceStringform
  }



  navigateTospecificcar(vectorSearch:string){
    this.Route.navigate(["/car",vectorSearch])
    

    }
    
    
}
