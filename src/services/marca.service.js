import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class MarcaService {

  baseUrl = BASE_URL + "/marca";

  getById(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

  create(marca) { return axios.post(this.baseUrl + "/crear" + marca).then(res => res.data) }

  update(marca) { return axios.put(this.baseUrl + "/modificar/" + marca.id, marca).then(res => res.data) }

  delete(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

  getAll() { return axios.get(this.baseUrl + "/listar").then(res => res.data) }

}

export default new MarcaService();