import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/api/v1/shop";

class ShopService{

    getById(id){return axios.get(baseUrl + "/" + id, config).then(res => res.data)}

    getByName(name){return axios.get(baseUrl + "/getByName/" + name, config).then(res => res.data)}

    create(shop){return axios.post(baseUrl + "/createShop", shop, config).then(res => res.data)}

    update(shop){return axios.put(baseUrl + "/updateShop", shop, config).then(res => res.data)}

    delete(id){return axios.delete(baseUrl + "/deleteShop/" + id, config).then(res => res.data)}

    getAll(){return axios.get(baseUrl + "/getAllShops", config).then(res => res.data)}

    getAllByTypeShop(){return axios.get(baseUrl + "/getAllShopsByTypeLocal", config).then(res => res.data)}
        
}

export default new ShopService();
