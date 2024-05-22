import { Component,OnInit } from '@angular/core';
import { AllcarsService } from './allcars.service';
import { Router } from '@angular/router';


@Component({
  selector: 'allcars',
  templateUrl: './allcars.component.html',
  styleUrl: './allcars.component.css'
})
export class AllcarsComponent implements OnInit {
data:any[] = []
possibleButtons:string = 'available'
fetched:boolean = false 
Savecartofavs:string = "Save Car to favourites"


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

constructor(private router:Router){}


async ngOnInit(){
var serve = new AllcarsService()
this.data = await serve.fetchCardata()

console.log("The Data is",this.data)
this.fetched = true
}

navigateTospecificcar(vectorSearch:string){
console.log("this is the vector",vectorSearch)
this.router.navigate(["/car",vectorSearch])
}


}
