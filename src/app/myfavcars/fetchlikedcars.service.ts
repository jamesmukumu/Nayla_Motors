import axios from 'axios';

export class FetchfavsService {
  async gatherFavcars(phone: string) {
    try {
      var resp = await axios.get(
        'https://carshop-1.onrender.com/fetch/users/liked/car',
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
        'https://carshop-1.onrender.com/delete/car',
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
