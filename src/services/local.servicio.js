import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/api/shop";

class ShopService{

    getByName(name){return axios.get(baseUrl + "/" + name, config).then(res => res.data)}

    create(local){return axios.post(baseUrl + "/", local, config).then(res => res.data)}

    update(local){return axios.put(baseUrl + "/" + local.id, local, config).then(res => res.data)}

    delete(id){return axios.delete(baseUrl + "/" + id, config).then(res => res.data)}

    getAll(){return axios.get(baseUrl + "/list", config).then(res => res.data)}

    getAllByTypeShop(){return axios.get(baseUrl + "/list/shops", config).then(res => res.data)}
        
}

export default new ShopService();
