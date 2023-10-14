import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/local";

class StoreService{

    getByName(name){return axios.get(baseUrl + "/" + name, config).then(res => res.data)}

    save(local){return axios.post(baseUrl + "/crear", local, config).then(res => res.data)}

    update(local){return axios.put(baseUrl + "/modificar/" + local.id, local, config).then(res => res.data)}

    delete(id){return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data)}

    getAll(){return axios.get(baseUrl + "/listar", config).then(res => res.data)}

    listarLocales(){return axios.get(baseUrl + "/listar/locales", config).then(res => res.data)}
        
}

export default new StoreService();
