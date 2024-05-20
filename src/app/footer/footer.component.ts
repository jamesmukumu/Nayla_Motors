import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent{
Currentyr:number = new Date().getFullYear()
Companyname:string ="PJ Motors"
constructor(){

}


}
