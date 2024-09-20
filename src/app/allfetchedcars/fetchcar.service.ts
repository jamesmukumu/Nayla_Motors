import axios from 'axios';

export class FindService {
  async fetchAllcars() {
    try {
      var resp = await axios.get(
        'https://carshop-production.up.railway.app/fetch/all/Cars'
      );

      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
