import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class RubroServicio {

    baseUrl = BASE_URL + "/rubro";

    obtenerPorId(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

    crear(rubro) { return axios.post(this.baseUrl + "/crear" + rubro).then(res => res.data) }

    modificar(rubro) { return axios.put(this.baseUrl + "/modificar/" + rubro.id, rubro).then(res => res.data) }

    eliminar(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

    listar() { return axios.get(this.baseUrl + "/listar").then(res => res.data) }

}

export default new RubroServicio();

