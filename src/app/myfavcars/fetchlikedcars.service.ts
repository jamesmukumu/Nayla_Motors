import axios from 'axios';

export class FetchfavsService {
  async gatherFavcars(phone: string) {
    try {
      var resp = await axios.get(
        'http://localhost:7800/fetch/users/liked/car',
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


  async deleteCarfromfavs(carvactor:string,no:string){
try{
var resp = await axios.delete("http://localhost:7800/delete/car",{
params:{
"carVector":carvactor,
"number":no
}
})
return resp.data
}catch(err){
console.log(err)
}

  }
}
