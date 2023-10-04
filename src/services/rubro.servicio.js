import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class CategoryService {

    baseUrl = BASE_URL + "/rubro";

    getById(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

    save(rubro) { return axios.post(this.baseUrl + "/crear" + rubro).then(res => res.data) }

    update(rubro) { return axios.put(this.baseUrl + "/modificar/" + rubro.id, rubro).then(res => res.data) }

    delete(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

    getAll() { return axios.get(this.baseUrl + "/listar").then(res => res.data) }

}

export default new CategoryService();

