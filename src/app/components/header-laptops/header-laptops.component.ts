import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


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
export class HeaderLaptopsComponent {
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
  

constructor(){
this.dataSource.data = this.vehichle
}

}
