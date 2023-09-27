import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class ProveedorServicio {

  baseUrl = BASE_URL + "/proveedor";

  obtenerPorId(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

  crear(proveedor) { return axios.post(this.baseUrl + "/crear" , proveedor).then(res => res.data) }

  modificar(proveedor) { return axios.put(this.baseUrl + "/modificar/" + proveedor.id, proveedor).then(res => res.data) }

  eliminar(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

  listar() { return axios.get(this.baseUrl + "/listar").then(res => res.data) }

}

export default new ProveedorServicio();