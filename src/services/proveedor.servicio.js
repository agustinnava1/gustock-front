import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class ProviderService {

  baseUrl = BASE_URL + "/api/v1/provider";

  getById(id) { return axios.get(this.baseUrl + "/" + id).then(res => res.data) }

  create(provider) { return axios.post(this.baseUrl + "/createProvider" , provider).then(res => res.data) }

  update(provider) { return axios.put(this.baseUrl + "/updateProvider", provider).then(res => res.data) }

  delete(id) { return axios.delete(this.baseUrl + "/deleteProvider/" + id).then(res => res.data) }

  getAll() { return axios.get(this.baseUrl + "/getAllProviders").then(res => res.data) }

}

export default new ProviderService();