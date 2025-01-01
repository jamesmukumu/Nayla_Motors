import { Injectable } from '@angular/core';
import axios from 'axios';

export interface GeneralFilter {
  start_price: number;
  end_price: number;
  start_mileage: number;
  end_mileage: number;
  start_yom: number;
  end_yom: number;
  brand_name: string;
  source: string;
}
@Injectable({
  providedIn: 'root',
})
export class CarsService {
  async FetchSlug(slugQuery: string): Promise<any> {
    try {
      var resp = await axios.get(
        'https://carshop-1.onrender.com/filter/cars/namewise',
        {
          params: {
            carfilter: slugQuery,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.error(err);
    }
  }

  async FilterGen(filter: GeneralFilter) {
    try {
      var resp = await axios.post(
        'https://carshop-1.onrender.com/filter',
        filter
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  constructor() {}
}
