import axios from 'axios';

export class FetchfavsService {
  async gatherFavcars(phone: string) {
    try {
      var resp = await axios.get(
        'https://carshop-production-cdf2.up.railway.app/fetch/users/liked/car',
        {
          params: {
            phoneNumber: phone,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCarfromfavs(carvactor: string, no: string) {
    try {
      var resp = await axios.delete(
        'https://carshop-production-cdf2.up.railway.app/delete/car',
        {
          params: {
            carVector: carvactor,
            number: no,
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
