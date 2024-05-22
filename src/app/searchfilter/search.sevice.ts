import axios from 'axios';

export class FiltercarsService {
  async Fetchcars(
    minimumPrice: string,
    Maxprice: string,
    Brand: string,
    Currency: string
  ) {
    var resp = await axios.get('https://carshop-1.onrender.com/filter/cars', {
      params: {
        min: minimumPrice,
        max: Maxprice,
        brand: Brand,
        currency: Currency,
      },
    });
    return resp.data;
  }
}
