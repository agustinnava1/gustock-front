import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/stock";

class StockServicio{

    eliminar(id){return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data)}

    obtenerPorLocal(local){return axios.get(baseUrl + "/listar/" + local, config).then(res => res.data)}
        
}

export default new StockServicio();
