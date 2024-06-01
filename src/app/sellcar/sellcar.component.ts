import { Component,OnInit } from '@angular/core';
import { SaleService,Sell_info,Sell_car_images,Sell_car_info } from './sell.service';



@Component({
  selector: 'app-sellcar',
  templateUrl: './sellcar.component.html',
  styleUrl: './sellcar.component.css',
  providers:[SaleService]
})
export class SellcarComponent {
carPlate:string = ''
model:string = ''
make:string = ''
color:string = ''
mileage:string = ''
mileageUnit:string = ''
AccidentHistory:string =''
Price:string = ''
Location:string = ''
First_name:string = ''
Last_name:string = ''
Email:string = ''
Phonenumber:string = ''
idnumber:string = ''
preferredContact:string =''
Savedsale:boolean = false

Carimageone:any
Carimagetwo:any
Carimagethree:any
Frontid:any
Backid:any
Errormsg:boolean = false
Msgs:any[]= [{
"severity":"warn",
"detail":"Car Plate has beeen already registered"
}]



constructor(public Salecar:SaleService){}
HandleUpload(eventsOfupload:any){
return this.Carimageone = eventsOfupload.currentFiles[0]
}
HandleUploadfrontid(eventsOfupload:any){
return this.Frontid = eventsOfupload.currentFiles[0]
}
HandleUploadbackid(eventsOfupload:any){
return this.Backid = eventsOfupload.currentFiles[0]
}
HandleUploadCartwo(eventsOfupload:any){
return this.Carimagetwo = eventsOfupload.currentFiles[0]
}
HandleUploadCarthree(eventsOfupload:any){
return this.Carimagethree = eventsOfupload.currentFiles[0]
}


async Handleactualsale(){
this.Savedsale = true
try{
var PersonalizedInfo:Sell_info={
email:this.Email,
firstname:this.First_name,
id:this.idnumber,
lastname:this.Last_name,
phonenumber:this.Phonenumber,
preference:this.preferredContact
}


var Carinfo:Sell_car_info = {
price:this.Price,
color:this.color,
location:this.Location,
make:this.make,
mileage:this.mileage,
mileage_unit:this.mileageUnit,
carplate:this.carPlate,
model:this.model,
Accident_History:this.AccidentHistory
}

var Carimages:Sell_car_images ={
Front_id:this.Frontid,
Back_id:this.Backid,
Carimageone:this.Carimageone,
Carimagetwo:this.Carimagetwo,
Carimagethree:this.Carimagethree
}

var somedata = await this.Salecar.Sendsellinfo(PersonalizedInfo,Carinfo,Carimages)
console.log(somedata)
if(somedata.msg === 'Reg Number already in use')this.Errormsg=true


}catch(err){
console.log(err)
}


}

resultCheck(event:any){
this.preferredContact = event.source.value
}

}
