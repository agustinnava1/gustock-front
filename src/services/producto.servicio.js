import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";
import { builderParams } from "../helper/builder.params"

const baseUrl = BASE_URL + "/product";

class ProductService {

    create(product) { return axios.post(baseUrl + "/", product, config).then(res => res.data) }

    update(product) { return axios.put(baseUrl + "/" + product.id, product, config).then(res => res.data) }

    delete(id) { return axios.delete(baseUrl + "/" + id, config).then(res => res.data) }

    getById(id) { return axios.get(baseUrl + "/" + id, config).then(res => res.data) }

    getByCodeOrBarcode(request) { 
        const params = builderParams(request)
        return axios.get(baseUrl + "/code?" + params, config).then(res => res.data) 
    }

    getAllByFilters(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/list?" + params, config).then(res => res.data)
    }

    getAllWithStock(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/stock?" + params, config).then(res => res.data)
    }

    getAllByCriteria(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/search?" + params, config).then(res => res.data)
    }

    updatePrices(request) { return axios.put(baseUrl + "/update/prices", request, config).then(res => res.data) }

}

export default new ProductService();