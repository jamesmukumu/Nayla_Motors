import { Component,OnInit } from '@angular/core';
import { FindService } from './fetchcar.service';
import  {Router} from "@angular/router"

interface PageEvent{
length:number
pageIndex:number
pageSize:number
previousPageIndex?: number
}



@Component({
  selector: 'allfetchedcars',
  templateUrl: './allfetchedcars.component.html',
  styleUrl: './allfetchedcars.component.css'
})
export class AllfetchedcarsComponent {
first: number = 0;
rows: number = 10
carsCount:number = 0
last:number = 0
data:any[] = []
paginatedData:any[] =[] 
firstFetchedalready:boolean = false

changePage(event: PageEvent){
  this.firstFetchedalready = false
  console.log("pre data",this.data)
  this.first = event.pageIndex * event.pageSize + 1;
  this.last = Math.min(this.first + event.pageSize - 1, event.length);
  console.log(`First item index: ${this.first}`);
  console.log(`Last item index: ${this.last}`);
   this.paginatedData = this.showCarspagewise(this.first,this.last,this.data)
   console.log("updated data is",this.paginatedData)
}




async ngOnInit(){
var fetch = new FindService()
var someData = await fetch.fetchAllcars()
this.carsCount = someData.count
this.data = someData.data

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

constructor(private router:Router){}




navigateTospecificcar(vectorSearch:string){
console.log("this is the vector",vectorSearch)
this.router.navigate(["/car",vectorSearch])
}

  
}
