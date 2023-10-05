import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/stock";

class StockService{

    delete(id){return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data)}

    getByStore(local){return axios.get(baseUrl + "/listar/" + local, config).then(res => res.data)}

    getAllByProductId(id){return axios.get(baseUrl + "/producto/" + id, config).then(res => res.data)}
        
    async getTotalStockByProduct(id){
        const res = await axios.get(baseUrl + "/producto/" + id + "/total", config);
        return res.data;
    }
}

export default new StockService();
