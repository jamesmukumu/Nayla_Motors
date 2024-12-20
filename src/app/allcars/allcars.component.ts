import { Component,OnInit,inject } from '@angular/core';
import { AllcarsService } from './allcars.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addToWishList } from '../redux/actions.wishList';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'allcars',
  templateUrl: './allcars.component.html',
  styleUrl: './allcars.component.css',
  providers:[AllcarsService,MessageService]
})
export class AllcarsComponent implements OnInit {
data:any[] = []
readonly snack = inject(MatSnackBar)
possibleButtons:string = 'available'
fetched:boolean = false 
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

constructor(private cars:AllcarsService,private router:Router,private store:Store){}


async fetchCars (){
this.data = await this.cars.fetchCardata()
console.log(this.data)
if(this.data.length > 0){
  this.fetched = true
}
}
SaveToWish(slug:string){
this.snack.open("Cars added to wishlist","Wishlist",{
horizontalPosition:"left",
verticalPosition:"top"
})
this.store.dispatch(addToWishList({carSlug:slug}))
}
ngOnInit(){
this.fetchCars()


}



navigateTospecificcar(vectorSearch:string){
this.router.navigate(["/car",vectorSearch])
}


}
