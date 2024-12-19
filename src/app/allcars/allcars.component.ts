import { Component,OnInit } from '@angular/core';
import { AllcarsService } from './allcars.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { saveCartocomparision } from '../redux/action.savecartocompare';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'allcars',
  templateUrl: './allcars.component.html',
  styleUrl: './allcars.component.css',
  providers:[MessageService,AllcarsService]
})
export class AllcarsComponent implements OnInit {
data:any[] = []
possibleButtons:string = 'available'
fetched:boolean = false 
Savecartofavs:string = "Save Car to favourites"
carSave$:Observable<any>


defaultImage:string = "../../assets/naylamotors.webp"
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

return priceStringform
}

constructor(private cars:AllcarsService,private router:Router,private store:Store<{"comparisions":any}>,private msg:MessageService){
this.carSave$ = this.store.select("comparisions")

}


async fetchCars (){
this.data = await this.cars.fetchCardata()
console.log(this.data)
if(this.data.length > 0){
  this.fetched = true
}
}
   
ngOnInit(){
this.fetchCars()


}

addCarslugtolist(slug:string){
 this.store.dispatch(saveCartocomparision({slug}))
 this.carSave$.subscribe((data=>{
  localStorage.setItem("comparisions",data)
    this.msg.add({severity:"success",detail:"Car Added Success fully to compare list"})
 }))
}


navigateTospecificcar(vectorSearch:string){
console.log("this is the vector",vectorSearch)
this.router.navigate(["/car",vectorSearch])
}


}
