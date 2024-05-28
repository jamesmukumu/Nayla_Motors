import axios from 'axios';

export class CarService {
  async fetchCarbasedonvector(searchvector: any) {
    var resp = await axios.get('http://localhost:7800/fetch/specific/car', {
      params: { searchVector: searchvector },
    });
    console.log(resp.data);

    return resp.data;
  }
  async Fetchcarimagesfromkairo(carSlug: string | null) {
    try {
      var resp = await axios.get('http://localhost:7800/fetch/car/images', {
        params: {
          slug: carSlug,
        },
      });
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
