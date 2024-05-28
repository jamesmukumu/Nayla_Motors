import axios from 'axios';

export class AllcarsService {
  car: any[] = [];

  async fetchCardata(): Promise<any[]> {
    var resp = await axios.get('http://localhost:7800/fetch/all/Cars');
    var randNo: number = Math.random() * 300;
    randNo = Math.floor(randNo);
    var addedNumber: number = randNo + 6;
    return resp.data.data.slice(randNo, addedNumber);
  }
}
