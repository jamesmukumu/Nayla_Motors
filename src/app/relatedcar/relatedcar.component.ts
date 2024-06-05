import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RelatedcarService } from './relatedcar.service';
import { MenuItem } from 'primeng/api';
interface Image {
	image:string
  id:number
  created_at:string
  updated_at:string
  }

@Component({
  selector: 'relatedcar',
  templateUrl: './relatedcar.component.html',
  styleUrl: './relatedcar.component.css',
  providers:[RelatedcarService]
})
export class RelatedcarComponent implements OnInit{
constructor(private carroute:ActivatedRoute,private relatedCar:RelatedcarService,private router:Router){}


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


navigateRelatedcar(carslug:string):void{
this.router.navigate([`/car/${carslug}`])
}

ngOnInit(){

console.log("http://localhost:4200"+this.router.url)


this.carroute.paramMap.subscribe(async(rt)=>{
var routeName = rt.get("carSlug")
this.carName = routeName
console.log(routeName)
var data = await this.relatedCar.fetchCarbasedonvector(this.carName)
this.carData = data.data
this.relatedCars = data.relatedcars
this.fetched = true
var someData = await this.relatedCar.Fetchcarimagesfromkairo(this.carName)
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



validateButton(btnAvailability:string){
  if(btnAvailability == this.possibleButtons){
  return true
  }else{
  return false
  }
  }

}
