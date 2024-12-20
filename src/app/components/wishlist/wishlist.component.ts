import { Component,OnInit,inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarService } from '../../car-specific/fetchcar.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RemoveFromWish } from '../../redux/actions.wishList';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
  providers:[CarService]
})
export class WishlistComponent implements OnInit {
  defaultImage:string = "../../assets/naylamotors.webp"
  readonly snack = inject(MatSnackBar)
  readonly dialog = inject(MatDialog)
constructor(private router:Router,private store:Store,private cars:CarService){}
carSlugs:string [] = []
carData:any[] = []
fetched:boolean = false
totalWishListCost:number = 0

navigateTospecificcar(vectorSearch:string){
  this.router.navigate(["/car",vectorSearch])
  }
  SaveToWish(slug:string){
    this.snack.open("Cars has been removed from Wish List","Ejected",{
    horizontalPosition:"left",
    verticalPosition:"top"
    })
    this.store.dispatch(RemoveFromWish({carSlug:slug}))
    this.fetchCars()
    }
formatPrice(price:number){
  var priceStringform:string = price.toString()
  priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
  return priceStringform
  }
async fetchCars(){
this.carData = []
this.fetched = false
for(let j = 0;j < this.carSlugs.length;j++){
var data = await this.cars.fetchCarbasedonvector(this.carSlugs[j])
this.totalWishListCost +=  data.data.Priceintform
this.carData = [...this.carData,data.data]
}
this.fetched = true
}

ngOnInit(){
this.store.subscribe((data:any)=>{
var {wishlist} = data
this.carSlugs = wishlist
})
console.log(this.carSlugs.length)

this.fetchCars()


}



}
