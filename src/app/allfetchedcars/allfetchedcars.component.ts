import { Component,OnInit } from '@angular/core';
import { FindService } from './fetchcar.service';
import  {Router} from "@angular/router"
import {Store} from "@ngrx/store"
import { addToWishList } from '../redux/actions.wishList';

interface PageEvent{
length:number
pageIndex:number
pageSize:number
previousPageIndex?: number
}



@Component({
  selector: 'allfetchedcars',
  templateUrl: './allfetchedcars.component.html',
  styleUrl: './allfetchedcars.component.css',
  providers:[FindService]
})
export class AllfetchedcarsComponent {
first: number = 0;
rows: number = 10
carsCount:number = 0
last:number = 0
data:any[] = []
paginatedData:any[] =[] 
firstFetchedalready:boolean = false
defaultImage:string = "https://res.cloudinary.com/dasrniwpk/image/upload/v1717157566/WhatsApp_Image_2024-05-31_at_2.59.52_PM_g5l1z8.jpg"
changePage(event: PageEvent){
  this.firstFetchedalready = false

  this.first = event.pageIndex * event.pageSize 
  this.last = Math.min(this.first + event.pageSize, event.length)

   this.paginatedData = this.showCarspagewise(this.first ,this.last,this.data)

}




async ngOnInit(){

var someData = await this.Finder.fetchAllcars()
this.carsCount = someData.count
this.data = someData.data
this.paginatedData= this.showCarspagewise(0,this.rows,this.data)
console.log("here is the data",this.data)
this.fetched = true
}

showCarspagewise(startTrunc:number,endTrunc:number,dataTotrunc:any[]):any[]{
 var newdata = dataTotrunc.slice(startTrunc,endTrunc)
return newdata
}

possibleButtons:string = 'available'
fetched:boolean = false 
Savecartofavs:string = "Save Car to favourites"
//



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

constructor(private router:Router,private Finder:FindService,private store:Store){}



SaveToWish(slug:string){
this.store.dispatch(addToWishList({carSlug:slug}))
}
navigateTospecificcar(vectorSearch:string){
console.log("this is the vector",vectorSearch)
this.router.navigate(["/car",vectorSearch])
}

  
}
