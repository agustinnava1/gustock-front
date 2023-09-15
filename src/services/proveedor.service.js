import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class ProveedorService {

  baseUrl = BASE_URL + "/proveedor";

  getById(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

  create(proveedor) { return axios.post(this.baseUrl + "/crear" , proveedor).then(res => res.data) }

  update(proveedor) { return axios.put(this.baseUrl + "/modificar/" + proveedor.id, proveedor).then(res => res.data) }

  delete(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

  getAll() { return axios.get(this.baseUrl + "/listar").then(res => res.data) }

}

export default new ProveedorService();