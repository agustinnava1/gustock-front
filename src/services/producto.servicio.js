import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper"
import { builderParams } from "../helper/builder.params"

const baseUrl = BASE_URL + "/product";

class ProductService {

    getById(id) { return axios.get(baseUrl + "/" + id, config).then(res => res.data) }

    create(product, stocks) { return axios.post(baseUrl + "/createProduct", product, stocks, config).then(res => res.data) }

    update(product) { return axios.put(baseUrl + "/updateProduct", product, config).then(res => res.data) }

    delete(id) { return axios.delete(baseUrl + "/deleteProduct/" + id, config).then(res => res.data) }

    updatePrices(request) { return axios.put(baseUrl + "/updatePrices", request, config).then(res => res.data) }

    updateProducts(products) { return axios.put(baseUrl + "/updateProducts", products, config).then(res => res.data) }

    getByCodeOrBarcode(request) { 
        const params = builderParams(request)
        return axios.get(baseUrl + "/code?" + params, config).then(res => res.data) 
    }

    getAllByFilters(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/getAllProducts?" + params, config).then(res => res.data)
    }

    getAllWithStock(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/stock?" + params, config).then(res => res.data)
    }

    getAllByCriteria(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/getAllProductsByCriteria?" + params, config).then(res => res.data)
    }

}

export default new ProductService();