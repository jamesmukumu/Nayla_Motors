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
}
