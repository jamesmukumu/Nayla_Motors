import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
Screenwidth:number = window.innerWidth
mobile = false
constructor(private router:Router){}   
ngOnInit(){
  this.Screenwidth =  window.innerWidth
  if(this.Screenwidth < 800){
    this.mobile = true
    }
  console.log(`the screen width is ${this.Screenwidth} and mobile State is ${this.mobile}`)

}
navigateDash(){
  this.router.navigate([""])
}

}
