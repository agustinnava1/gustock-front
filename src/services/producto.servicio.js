import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/producto";

class ProductoService {

    getById(id) { return axios.get(baseUrl + "/" + id, config).then(res => res.data) }

    save(producto) { return axios.post(baseUrl + "/crear", producto, config).then(res => res.data) }

    update(producto) { return axios.put(baseUrl + "/modificar/" + producto.id, producto, config).then(res => res.data) }

    delete(id) { return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data) }

    getAll(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/listar?" + params, config).then(res => res.data)
    }

    getAllWithStock(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/listar/stock?" + params, config).then(res => res.data)
    }

    getAllByCriteria(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/buscar?" + params, config).then(res => res.data)
    }

}

export default new ProductoService();