import { Injectable } from '@angular/core';
import axios from 'axios';

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

  constructor() {}
}
