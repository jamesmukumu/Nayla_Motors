import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltercarsService } from './search.sevice';

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
  defaultImage:string = "https://res.cloudinary.com/dasrniwpk/image/upload/v1717157566/WhatsApp_Image_2024-05-31_at_2.59.52_PM_g5l1z8.jpg"
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

  constructor(private myroute: ActivatedRoute, public Route: Router, private carFetch: FiltercarsService) {
    console.log(this.myroute.snapshot.queryParams);
    this.maxPrice = this.myroute.snapshot.queryParams["maximumPrice"];
    this.minPrice = this.myroute.snapshot.queryParams["minimumPrice"];
    this.brand = this.myroute.snapshot.queryParams["carBrand"];
    this.currency = this.myroute.snapshot.queryParams["currency"];
  }

  changePage(event: PageEvent) {
    this.first = event.pageIndex * event.pageSize;
    this.last = Math.min(this.first + event.pageSize, event.length);
    this.paginatedData = this.showCarspagewise(this.first, this.last, this.data);
  }

  async implementSave(carVector: string) {
    var someData = await this.carFetch.Savecartofavs(this.phoneNo, carVector);
    this.visible = false;
    if (someData.msg === "saved") {
      this.Savesuccess = true;
    } else if (someData.msg === "car has already been saved") {
      this.Errorsave = true;
    }
  }

  async ngOnInit() {
    if (this.myroute.snapshot.queryParams["filterBy"] == "advanced search") {
      this.data = await this.carFetch.Fetchcars(this.minPrice, this.maxPrice, this.brand, this.currency);
      if (this.data === "Results not found") {
        this.Resultsnotfound = true;
        return;
      }
      this.length = this.data.length;
      this.fetched = true;
      this.paginatedData = this.showCarspagewise(0, this.pagesize, this.data);
    } else if (this.myroute.snapshot.queryParams["filterBy"] == "pricewise") {
      this.minPrice = this.myroute.snapshot.queryParams["minimumPrice"];
      this.maxPrice = this.myroute.snapshot.queryParams["maximumPrice"];
      var someData = await this.carFetch.Fetchcarbasedonprices(this.minPrice, this.maxPrice);
      this.data = someData.data;
      this.length = someData.count;
      if (this.data === "Results not found") {
        this.Resultsnotfound = true;
        return;
      }
      this.fetched = true;
      this.paginatedData = this.showCarspagewise(0, this.pagesize, this.data);
    } else if (this.myroute.snapshot.queryParams["filterBy"] == "manualSearch") {
      this.queryParam = this.myroute.snapshot.queryParams["carQuery"];
      var someData = await this.carFetch.Fetchcarbasedonkeyword(this.queryParam);
      this.data = someData.data;
      this.length = someData.count;
      if (someData === "Results not found") {
        this.Resultsnotfound = true;
        return;
      }
      this.fetched = true;
      this.paginatedData = this.showCarspagewise(0, this.pagesize, this.data);
    } else if (this.myroute.snapshot.queryParams["filterBy"] == "brandSearch") {
      this.queryParam = this.myroute.snapshot.queryParams["carBrand"];
      var someData = await this.carFetch.Fetchaccoundbrandwise(this.queryParam);
      this.data = someData.data;
      this.length = someData.count;
      if (someData === "Results not found") {
        this.Resultsnotfound = true;
        return;
      }
      this.fetched = true;
      this.paginatedData = this.showCarspagewise(0, this.pagesize, this.data);
    }else if(this.myroute.snapshot.queryParams["importedcars"] === "true"){
    var someData = await this.carFetch.Fetchimportedcars()
    this.data = someData.data
    this.length = someData.count
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
