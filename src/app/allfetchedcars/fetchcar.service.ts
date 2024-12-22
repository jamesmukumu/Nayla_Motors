import axios from 'axios';

export class FindService {
  async fetchAllcars() {
    try {
      var resp = await axios.get(
        'https://masoko-1.onrender.com/fetch/all/Cars'
      );

      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
