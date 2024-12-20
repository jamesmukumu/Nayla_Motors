import { Component,OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';



interface Vehichle {
accesibility:string
Tree_Name:string
Tree_Children?:Vehichle[]
}
interface FlatNode{
expandable:boolean
Tree_Name: string;
  identifierName?: string;  
  level: number;
}


@Component({
  selector: 'header-laptops',
  templateUrl: './header-laptops.component.html',
  styleUrl: './header-laptops.component.css'
})
export class HeaderLaptopsComponent implements OnInit {
  private _transformer = (node: Vehichle, level: number): FlatNode => {
    return {
      expandable: !!node.Tree_Children && node.Tree_Children.length > 0,
      Tree_Name: node.Tree_Name,
      identifierName: node.accesibility,  
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.Tree_Children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;
  vehichle: Vehichle[] = [
    {
      Tree_Name: "Local Vehicles",
      accesibility: "local",
      Tree_Children: [
        {
          Tree_Name: "Japanese",
          accesibility: "japan",
          Tree_Children: [
            { Tree_Name: "Suzuki", accesibility: "" },
            { Tree_Name: "Honda", accesibility: "" }
          ]
        }
      ]
    },
    {
      Tree_Name: "Imported Vehicles",
      accesibility: "imports",
      Tree_Children: [
        {
          Tree_Name: "American",
          accesibility: "us",
          Tree_Children: [
            { Tree_Name: "Chevrolet", accesibility: "" },
            { Tree_Name: "Ford", accesibility: "" }
          ]
        }
      ]
    }
  ];
  carsWishList:number = 0


ngOnInit(){
this.store.subscribe((data:any)=>{
this.carsWishList = data.wishlist.length
})
}


goHome(){
this.router.navigate(["/"])
}


goWish(){
  this.router.navigate(["/wishlist"])
  }
constructor(private store:Store,private router:Router){
this.dataSource.data = this.vehichle
}

}
