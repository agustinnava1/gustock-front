import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class BrandService {

  baseUrl = BASE_URL + "/api/v1/brand";

  getById(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

  create(marca) { return axios.post(this.baseUrl + "/createBrand", marca).then(res => res.data) }

  update(marca) { return axios.put(this.baseUrl + "/updateBrand", marca).then(res => res.data) }

  delete(id) { return axios.delete(this.baseUrl + "/deleteBrand/" + id).then(res => res.data) }

  getAll() { return axios.get(this.baseUrl + "/getAllBrands").then(res => res.data) }

}

export default new BrandService();