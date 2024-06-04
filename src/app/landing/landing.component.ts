import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
info =[
  {
    "severity":"warn",
    "detail":"PJ Motors offers a secure, verified and transparent platform where cars can be traded however we are only liable for transactions made through the PJ Motors offices and we don’t bear responsibility for third party transactions done outside our offices even in cases where a vehicle has been advertised on our web app. Contact us via 0759857032 for any clarification."
  }

]
constructor(private route:Router){}
clickGo(){
this.route.navigate(["/all"])
}
imports(){
this.route.navigate(["/filtered/cars"],{
queryParams:{"importedcars":true}
})
}

}
