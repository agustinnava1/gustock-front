import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/producto";

class ProductoService{

    getById(id){return axios.get(baseUrl + "/" + id, config).then(res => res.data)}

    create(producto){return axios.post(baseUrl + "/crear", producto, config).then(res => res.data)}

    update(producto){return axios.put(baseUrl + "/modificar/" + producto.id, producto, config).then(res => res.data)}

    delete(id){return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data)}

    getAll(){return axios.get(baseUrl + "/listar", config).then(res => res.data)}
        
}

export default new ProductoService();