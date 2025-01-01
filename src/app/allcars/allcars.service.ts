import axios from 'axios';

export class AllcarsService {
  car: any[] = [];

  async fetchCardata(): Promise<any[]> {
    var resp = await axios.get('https://carshop-1.onrender.com/fetch/all');
    var { count, data } = resp.data;

    return data;
  }
}
