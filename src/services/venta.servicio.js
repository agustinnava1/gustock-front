import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/venta";

class VentaServicio{

    obtenerPorId(id){return axios.get(baseUrl + "/" + id, config).then(res => res.data)}

    crear(producto){return axios.post(baseUrl + "/crear", producto, config).then(res => res.data)}

    modificar(producto){return axios.put(baseUrl + "/modificar/" + producto.id, producto, config).then(res => res.data)}

    eliminar(id){return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data)}

    listar(){return axios.get(baseUrl + "/listar", config).then(res => res.data)}
        
}

export default new VentaServicio();