import axios from 'axios';
import { Router } from '@angular/router';

export class CarService {
  async fetchCarbasedonvector(searchvector: any) {
    var resp = await axios.get(
      'https://carshop-production.up.railway.app/fetch/specific/car',
      {
        params: { searchVector: searchvector },
      }
    );
    console.log(resp.data);

    return resp.data;
  }
  async Fetchcarimagesfromkairo(carSlug: string | null) {
    try {
      var resp = await axios.get(
        'https://carshop-production.up.railway.app/fetch/car/images',
        {
          params: {
            slug: carSlug,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
