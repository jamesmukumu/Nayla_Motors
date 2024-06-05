import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
sidebarVisible:boolean = false
mobile = false
constructor(private router:Router){}   

navigateDash(){
  this.router.navigate([""])
}

importsNavigate(){
this.router.navigate(["/filtered/cars"],{
queryParams:{"importedcars":true}
})
}

}
