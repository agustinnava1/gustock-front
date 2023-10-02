import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/venta";

class VentaService {

    getById(id) { return axios.get(baseUrl + "/" + id, config).then(res => res.data) }

    save(product) { return axios.post(baseUrl + "/crear", product, config).then(res => res.data) }

    update(product) { return axios.put(baseUrl + "/modificar/" + product.id, product, config).then(res => res.data) }

    delete(id) { return axios.delete(baseUrl + "/eliminar/" + id, config).then(res => res.data) }

    exportToExcel(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/exportar/xlsx?" + params, { responseType: 'blob' })
        .then((response) => {
            const blobUrl = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = 'historial-ventas.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(blobUrl);
        })
    }

    getAll(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/listar?" + params, config).then(res => res.data)
    }

    getAllByCategory(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/listar/rubro?" + params, config).then(res => res.data)
    }

    getAllByProduct(pagination) {
        const params = Object.keys(pagination)
            .filter(key => pagination[key] !== null)
            .map(key => `${key}=${pagination[key]}`)
            .join('&');

        return axios.get(baseUrl + "/listar/producto?" + params, config).then(res => res.data)
    }

}

export default new VentaService();