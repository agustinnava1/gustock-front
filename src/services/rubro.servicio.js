import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class CategoryService {

    baseUrl = BASE_URL + "/api/v1/category";

    getById(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

    create(rubro) { return axios.post(this.baseUrl + "/createCategory", rubro).then(res => res.data) }

    update(rubro) { return axios.put(this.baseUrl + "/updateCategory", rubro).then(res => res.data) }

    delete(id) { return axios.delete(this.baseUrl + "/deleteCategory/" + id).then(res => res.data) }

    getAll() { return axios.get(this.baseUrl + "/getAllCategories").then(res => res.data) }

}

export default new CategoryService();

