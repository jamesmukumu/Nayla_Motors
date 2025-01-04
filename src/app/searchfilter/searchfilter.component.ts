import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltercarsService } from './search.sevice';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Store} from "@ngrx/store"
import { addToWishList } from '../redux/actions.wishList';
import { GeneralFilter,CarsService } from '../services/cars.service';


interface PageEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex?: number;
}

@Component({
  selector: 'searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css'],
  providers: [FiltercarsService]
})

export class SearchfilterComponent implements OnInit {
  readonly snack = inject(MatSnackBar)
  defaultImage:string = "../../assets/naylamotors.webp"
  phoneNo: string = "";
  maxPrice: string = "";
  minPrice: string = "";
  brand: string = '';
  queryParam: string = "";
  currency: string = '';
  possibleButtons: string = 'available';
  data: any;
  Resultsnotfound: boolean = false;
  fetched: boolean = false;
  length: number = 0;
  pagesize: number = 8;
  first: number = 0;
  last: number = 0;
  paginatedData: any[] = [];
  visible: boolean = false;
  Addcard: string = 'save this car to your favourites';
  msg: any = [{
    "severity": "warn",
    "detail": "Result not found"
  }];
  //
  Savesuccess: boolean = false;
  Errorsave: boolean = false;
  successmsg: any = [{
    "severity": "success",
    "detail": "Car has been saved successfully to favourites"
  }];
  errormsg: any = [{
    "severity": "error",
    "detail": "Car has already been saved to favourites"
  }];

  constructor(private Car:CarsService,private store:Store,private myroute: ActivatedRoute, public Route: Router, private carFetch: FiltercarsService) {
    console.log(this.myroute.snapshot.queryParams);
    this.maxPrice = this.myroute.snapshot.queryParams["maximumPrice"];
    this.minPrice = this.myroute.snapshot.queryParams["minimumPrice"];
    this.brand = this.myroute.snapshot.queryParams["carBrand"];
    this.currency = this.myroute.snapshot.queryParams["currency"];
  }

  SaveToWish(slug:string){
    this.snack.open("Cars added to wishlist","Wishlist",{
    horizontalPosition:"left",
    verticalPosition:"top"
    })
    this.store.dispatch(addToWishList({carSlug:slug}))
    }
  changePage(event: PageEvent) {
    this.first = event.pageIndex * event.pageSize;
    this.last = Math.min(this.first + event.pageSize, event.length);
    this.paginatedData = this.showCarspagewise(this.first, this.last, this.data);
  }



  async ngOnInit() {
  if (this.myroute.snapshot.queryParams["filterBy"] == "General") {
      this.minPrice = this.myroute.snapshot.queryParams["startPrice"];
      this.maxPrice = this.myroute.snapshot.queryParams["endPrice"];
      var load:GeneralFilter = {
        start_price:parseInt(this.minPrice),
        end_price:parseInt(this.maxPrice),
        start_mileage:parseInt(this.myroute.snapshot.queryParams["startMileage"]),
        end_mileage:parseInt(this.myroute.snapshot.queryParams["endMileage"]),
        brand_name:this.myroute.snapshot.queryParams["choosenCar"],
        start_yom:parseInt(this.myroute.snapshot.queryParams["startYOM"]),
        end_yom:parseInt(this.myroute.snapshot.queryParams["endYOM"]),
        source:this.myroute.snapshot.queryParams["source"]
}

      var someData = await this.Car.FilterGen(load)
      this.data = someData.data;
      this.length = someData.count;
      if (this.data === "Results not found") {
        this.Resultsnotfound = true;
        return;
      }
      this.fetched = true;
      this.paginatedData = this.showCarspagewise(0, this.pagesize, this.data);
    }  else if (this.myroute.snapshot.queryParams["filterBy"] == "pricewise") {
      this.minPrice = this.myroute.snapshot.queryParams["minimumPrice"];
      this.maxPrice = this.myroute.snapshot.queryParams["maximumPrice"];
      var someData = await this.carFetch.Fetchcarbasedonprices(this.minPrice,this.maxPrice);
      this.data = someData.data;
      this.length = someData.count;
      if (someData === "Results not found") {
        this.Resultsnotfound = true;
        return;
      }
      this.fetched = true;
      this.paginatedData = this.showCarspagewise(0, this.pagesize, this.data);
    }
  }

  validateButton(btnAvailability: string) {
    return btnAvailability === this.possibleButtons;
  }

  formatPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  showCarspagewise(startTrunc: number, endTrunc: number, dataTotrunc: any[]): any[] {
    return dataTotrunc.slice(startTrunc, endTrunc);
  }

  navigateTospecificcar(vectorSearch: string) {
    this.Route.navigate(["/car", vectorSearch]);
  }
}
