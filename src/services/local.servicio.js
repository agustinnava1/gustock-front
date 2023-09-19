import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/local";

class LocalServicio{

    obtenerPorId(id){return axios.get(baseUrl + "/" + id, config).then(res => res.data)}

    crear(local){return axios.post(baseUrl + "/crear", local, config).then(res => res.data)}

    actualizar(local){return axios.put(baseUrl + "/modificar/" + local.id, local, config).then(res => res.data)}

    borrar(id){return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data)}

    listar(){return axios.get(baseUrl + "/listar", config).then(res => res.data)}
        
}

export default new LocalServicio();
