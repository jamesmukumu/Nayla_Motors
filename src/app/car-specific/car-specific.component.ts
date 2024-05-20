import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from './fetchcar.service';



interface Image {
	thumbNail: string;
	img: string;
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

images: Image[] = [];
interiorFeatures:any[] =[]
interiorResults:any[] = []

safetyFeatures:any[] =[]
safetyResults:any[] = []



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




constructor(route:ActivatedRoute){
var carserve = new CarService()

route.paramMap.subscribe(async(rt)=>{
var routeName = rt.get("searchvector")
console.log(routeName)
this.carData = await carserve.fetchCarbasedonvector(routeName)
this.generateImagefromthumbnail(this.carData.thumbnail)
console.log("the Keys of the Car",Object.keys(this.carData.interior_features))
this.interiorFeatures = Object.keys(this.carData.interior_features)
console.log("the values of the Car",Object.values(this.carData.interior_features))
this.interiorResults = Object.values(this.carData.interior_features)


this.safetyFeatures = Object.keys(this.carData.safety_features)

this.safetyResults = Object.values(this.carData.safety_features)


})
}



generateImagefromthumbnail(thumbnailimg: string) {
    var modifiedThumbnailimage = thumbnailimg.replace(/(\d)(?=\.\w+$)/, "");
    modifiedThumbnailimage = modifiedThumbnailimage.replace("thumbnails", "images");

    for (var i = 0; i <= 9; i++) {
      var newUrl: string = modifiedThumbnailimage.replace(/(\.\w+)$/, i + "$1");
      
      const image: Image = {
        img: newUrl,
        thumbNail: modifiedThumbnailimage
      };

      console.log(image);
      this.images.push(image);
    }
    console.log("here is the image work", this.images);
   

  }






formatPrice(price:number){
var priceStringform:string = price.toString()
priceStringform = priceStringform.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
console.log("the car price",priceStringform)
return priceStringform
}


}
