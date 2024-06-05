import axios from 'axios';

export class RelatedcarService {
  async fetchCarbasedonvector(searchvector: any) {
    var resp = await axios.get(
      'https://carshop-1.onrender.com/fetch/specific/car',
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
        'https://carshop-1.onrender.com/fetch/car/images',
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
