import axios from 'axios';

export class AllcarsService {
  car: any[] = [];

  async fetchCardata(): Promise<any[]> {
    var resp = await axios.get(
      'https://carshop-production-cdf2.up.railway.app/fetch/all/Cars'
    );
    var randNo: number = Math.random() * 2900;
    randNo = Math.floor(randNo);
    var addedNumber: number = randNo + 6;
    return resp.data.data.slice(randNo, addedNumber);
  }
}
