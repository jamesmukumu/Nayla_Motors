import axios from 'axios';

export class AllcarsService {
  car: any[] = [];

  async fetchCardata(): Promise<any[]> {
    var resp = await axios.get('http://localhost:7800/fetch/all');
    var { count, data } = resp.data;

    return data;
  }
}
