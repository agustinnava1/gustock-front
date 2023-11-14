import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper"
import { builderParams } from "../helper/builder.params"

const baseUrl = BASE_URL + "/api/v1/stock";

class StockService{

    delete(id){return axios.delete(baseUrl + "/" + id, config).then(res => res.data)}

    getAllByShop(name, request){
        const params = builderParams(request)
        return axios.get(baseUrl + "/list/" + name + "?" + params, config).then(res => res.data)
    }

    getAllByProductId(id){return axios.get(baseUrl + "/getAllStocksByProduct/" + id, config).then(res => res.data)}
        
    async getTotalStockByProduct(id){
        const res = await axios.get(baseUrl + "/product/" + id + "/total", config);
        return res.data;
    }

}

export default new StockService();
