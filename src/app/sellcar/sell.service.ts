import axios from 'axios';

export interface Sell_info {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  phonenumber: string;
  preference: string;
}
export interface Sell_car_info {
  price: string;
  color: string;
  location: string;
  make: string;
  mileage: string;
  mileage_unit: string;
  carplate: string;
  model: string;
  Accident_History: string;
}

export interface Sell_car_images {
  Front_id: string;
  Back_id: string;
  Carimageone: string;
  Carimagetwo: string;
  Carimagethree: string;
}
export class SaleService {
  async Sendsellinfo(
    Personalinfo: Sell_info,
    Carinfo: Sell_car_info,
    Images: Sell_car_images
  ) {
    try {
      const { email, firstname, lastname, id, preference, phonenumber } =
        Personalinfo;
      const {
        price,
        color,
        location,
        make,
        mileage,
        mileage_unit,
        carplate,
        model,
        Accident_History,
      } = Carinfo;
      const { Front_id, Back_id, Carimageone, Carimagetwo, Carimagethree } =
        Images;

      var formData = new FormData();
      formData.append('email', email);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('id', id);
      formData.append('preference', preference);
      formData.append('price', price);
      formData.append('color', color);
      formData.append('location', location);
      formData.append('make', make);
      formData.append('mileage', mileage);
      formData.append('mileage_unit', mileage_unit);
      formData.append('carplate', carplate);
      formData.append('model', model);
      formData.append('phonenumber', phonenumber);
      formData.append('frontid', Front_id);
      formData.append('backimage', Back_id);
      formData.append('carimageone', Carimageone);
      formData.append('carimagetwo', Carimagetwo);
      formData.append('carimagethree', Carimagethree);
      formData.append('accident', Accident_History);

      var resp = await axios.post(
        'https://carshop-production.up.railway.app/handle/sell/car',
        formData,
        {
          headers: {
            'Content-Type': 'multipart-form',
          },
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
