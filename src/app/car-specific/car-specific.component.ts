import { Component,inject } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CarService } from './fetchcar.service';
import { MenuItem } from 'primeng/api';
import {Store} from '@ngrx/store'
import { addToWishList } from '../redux/actions.wishList';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Title} from "@angular/platform-browser"
interface Image {
	image:string
  id:number
  created_at:string
  updated_at:string
  }


 

@Component({
  selector: 'car-specific',
  templateUrl: './car-specific.component.html',
  styleUrl: './car-specific.component.css',
 

  
})   
export class CarSpecificComponent {
defaultImg:string ='data:image/png;base64,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'
readonly snack = inject(MatSnackBar)
sidebarVisible: boolean = false;
sidebarSafety = false
Savecartofavs:string = "Save Car to favourites"
carData:any
possibleButtons:string = 'available'
carName:any = ""
relatedCars:any[] = []
images: Image[] = [];
interiorFeatures:any[] =[]
interiorResults:any[] = []
fetched:boolean = false
safetyFeatures:any[] =[]
safetyResults:any[] = []

items:MenuItem[]|undefined
home:MenuItem | undefined
responsiveOptions: any[] =  [
  {
      breakpoint: '1300px',
      numVisible: 4
  },
  {
      breakpoint: '575px',
      numVisible: 1
  }
];


navigateRelatedcar(carslug:string):void{
this.router.navigate([`/relatedcar/${carslug}`])
}

constructor(route:ActivatedRoute,private router:Router,private store:Store,private titler:Title){
var carserve = new CarService()



route.paramMap.subscribe(async(rt)=>{
var routeName = rt.get("searchvector")
this.carName = routeName
console.log(routeName)
var data = await carserve.fetchCarbasedonvector(routeName)
this.carData = data.data
this.titler.setTitle(`${this.carData.name}|Nayla Motors Car Dealership`)
this.relatedCars = data.relatedcars
this.fetched = true
var someData = await carserve.Fetchcarimagesfromkairo(routeName)
this.images =   someData.pageProps.vehicle.vehicle_images
this.interiorFeatures = Object.keys(this.carData.interior_features)
this.interiorResults = Object.values(this.carData.interior_features)


this.safetyFeatures = Object.keys(this.carData.safety_features)

this.safetyResults = Object.values(this.carData.safety_features)


})
this.items = [
  {
  label:"vehichle",
  },
  {
    label:this.carName
  }
  ]
  this.home = {icon:"pi pi-home",routerLink:"/",tooltip:"Back to home"}
}
callUs(){
window.location.href = 'tel:0759857032'
}
whatsups(){
window.location.href = 'https://wa.me/+254759857032'
}

SaveToWish(slug:string){
  this.snack.open("Cars added to wishlist","Wishlist",{
  horizontalPosition:"left",
  verticalPosition:"top"
  })
  this.store.dispatch(addToWishList({carSlug:slug}))
  }
formatPrice(price:number){
var priceStringform:string = price.toString()
priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
console.log("the car price",priceStringform)
return priceStringform
}



validateButton(btnAvailability:string){
  if(btnAvailability == this.possibleButtons){
  return true
  }else{
  return false
  }
  }


}
