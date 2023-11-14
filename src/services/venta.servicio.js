import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";
import { builderParams } from "../helper/builder.params";

const baseUrl = BASE_URL + "/api/v1/sale";

class SaleService {

    getById(id) { return axios.get(baseUrl + "/" + id, config).then(res => res.data) }

    create(sale) { return axios.post(baseUrl + "/create", sale, config).then(res => res.data) }

    delete(id) { return axios.delete(baseUrl + "/delete/" + id, config).then(res => res.data) }

    getAll(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/list?" + params, config).then(res => res.data)
    }

    getAllByCategory(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/list/category?" + params, config).then(res => res.data)
    }

    getAllByProduct(request) {
        const params = builderParams(request)
        return axios.get(baseUrl + "/list/product?" + params, config).then(res => res.data)
    }

    getAllCurrentByShop(shopName) {
        return axios.get(baseUrl + "/getAllCurrentSalesByShop/" + shopName, config).then(res => res.data)
    }

}

export default new SaleService();