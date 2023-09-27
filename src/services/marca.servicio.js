import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class MarcaServicio {

  baseUrl = BASE_URL + "/marca";

  obtenerPorId(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

  crear(marca) { return axios.post(this.baseUrl + "/crear" + marca).then(res => res.data) }

  modificar(marca) { return axios.put(this.baseUrl + "/modificar/" + marca.id, marca).then(res => res.data) }

  eliminar(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

  listar() { return axios.get(this.baseUrl + "/listar").then(res => res.data) }

}

export default new MarcaServicio();