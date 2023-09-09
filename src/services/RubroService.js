import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class RubroService{

    baseUrl = BASE_URL + "/rubro";

    getById(rubroId){return axios.get(this.baseUrl + "/" + rubroId);}

    create(rubro){return axios.post(this.baseUrl + "/crear" + rubro)}

    update(rubroId, rubro){return axios.put(this.baseUrl + "/modificar/" + rubroId, rubro)}

    delete(rubroId){return axios.delete(this.baseUrl + "/eliminar/" + rubroId)}

    getAll(){return axios.get(this.baseUrl+ "/listar");}

}

export default new RubroService();

