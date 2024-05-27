import { Component } from '@angular/core';
import { FetchfavsService } from './fetchlikedcars.service';
import { Router } from '@angular/router';


@Component({
  selector: 'myfavcars',
  templateUrl: './myfavcars.component.html',
  styleUrl: './myfavcars.component.css',
  providers:[FetchfavsService]
})
export class MyfavcarsComponent {
visible:boolean = false
phone:string = ""
fetched:boolean = false
data:any[] = []
loading:boolean = false
possibleButtons:string = 'available'

ShowDialogue(){
this.visible = true
}
formatPrice(price:number){
  var priceStringform:string = price.toString()
  priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  console.log("the car price",priceStringform)
  return priceStringform
  }


constructor(private fav:FetchfavsService,private router:Router){}

async Fetchcars(){
this.loading = true
var someData =await  this.fav.gatherFavcars(this.phone)
this.data = someData.data
if(someData.msg == 'all cars for user have been fetched'){
this.fetched = true
this.visible = false
return
}
}
validateButton(btnAvailability:string){
  if(btnAvailability == this.possibleButtons){
  return true
  }else{
  return false
  }
  }


navigateTospecificcar(vectorSearch:string){
  console.log("this is the vector",vectorSearch)
  this.router.navigate(["/car",vectorSearch])
  }
}
