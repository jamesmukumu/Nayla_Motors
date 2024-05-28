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

  async Fetchcarbasedonprices(minPrice: string, maxPrice: string) {
    try {
      var resp = await axios.get(
        'https://carshop-1.onrender.com/filter/cars/pricewise',
        {
          params: {
            min: minPrice,
            max: maxPrice,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  async Fetchcarbasedonkeyword(keyword: string) {
    try {
      var resp = await axios.get(
        'https://carshop-1.onrender.com/filter/cars/namewise',
        {
          params: {
            carfilter: keyword,
          },
        }
      );

      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  async Fetchaccoundbrandwise(brand: string) {
    try {
      var resp = await axios.get(
        'https://carshop-1.onrender.com/fetch/car/brand',
        {
          params: {
            carName: brand,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  async Savecartofavs(identify: string, carVector: string) {
    try {
      var payload = {
        identifier: identify,
        carvector: carVector,
      };
      var resp = await axios.post(
        'https://carshop-1.onrender.com/save/car',
        payload
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
