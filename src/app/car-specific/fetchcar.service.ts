import axios from 'axios'

export class  CarService{

async fetchCarbasedonvector(searchvector:any){


var resp = await axios.get("https://carshop-hyqx.onrender.com/fetch/specific/car",{
params:{"searchVector":searchvector}
})
console.log(resp.data)

return resp.data

}

}