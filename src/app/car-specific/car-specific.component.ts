import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CarService } from './fetchcar.service';
import { MenuItem } from 'primeng/api';


interface Image {
	image:string
  id:number
  created_at:string
  updated_at:string
  }




@Component({
  selector: 'car-specific',
  templateUrl: './car-specific.component.html',
  styleUrl: './car-specific.component.css'
})
export class CarSpecificComponent {
sidebarVisible: boolean = false;
sidebarSafety = false
carData:any
carName:any = ""
images: Image[] = [];
interiorFeatures:any[] =[]
interiorResults:any[] = []

safetyFeatures:any[] =[]
safetyResults:any[] = []

items:MenuItem[]|undefined
home:MenuItem | undefined
responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];




constructor(route:ActivatedRoute,private router:Router){
var carserve = new CarService()
console.log("http://localhost:4200"+this.router.url)


route.paramMap.subscribe(async(rt)=>{
var routeName = rt.get("searchvector")
this.carName = routeName
console.log(routeName)
this.carData = await carserve.fetchCarbasedonvector(routeName)
var someData = await carserve.Fetchcarimagesfromkairo(routeName)
console.log("the car images are as follow",someData.pageProps.vehicle.vehicle_images)
this.images =   someData.pageProps.vehicle.vehicle_images
console.log("the Keys of the Car",Object.keys(this.carData.interior_features))
this.interiorFeatures = Object.keys(this.carData.interior_features)
console.log("the values of the Car",Object.values(this.carData.interior_features))
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
window.location.href = 'https://wa.me/0759857032'
}


formatPrice(price:number){
var priceStringform:string = price.toString()
priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
console.log("the car price",priceStringform)
return priceStringform
}


}
