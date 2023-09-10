import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

export class LocalService{

    baseUrl = BASE_URL + "/local";

    getById(id){return axios.get(this.baseUrl + "/" + id);}

    create(local){return axios.post(this.baseUrl + "/crear" + local)}

    update(local){return axios.put(this.baseUrl + "/modificar/" + local.id, local)}

    delete(id){return axios.delete(this.baseUrl + "/eliminar/" + id)}

    getAll(){return axios.get(this.baseUrl+ "/listar").then(res => res.data);}

}
