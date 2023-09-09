import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class RubroService{

    baseUrl = BASE_URL + "/rubro";

    getById(id){return axios.get(this.baseUrl + "/" + id);}

    create(rubro){return axios.post(this.baseUrl + "/crear" + rubro)}

    update(rubro){return axios.put(this.baseUrl + "/modificar/" + rubro.id, rubro)}

    delete(id){return axios.delete(this.baseUrl + "/eliminar/" + id)}

    getAll(){return axios.get(this.baseUrl+ "/listar");}

}

export default new RubroService();

