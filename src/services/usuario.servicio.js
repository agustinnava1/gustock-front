import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

class UserService {

  baseUrl = BASE_URL + "/api/v1/user";

  getById(id) { return axios.get(this.baseUrl + "/" + id, config).then(res => res.data) }

  create(user) { return axios.post(this.baseUrl + "/createUser" , user, config).then(res => res.data) }

  update(user) { return axios.put(this.baseUrl + "/updateUser", user, config).then(res => res.data) }

  delete(id) { return axios.delete(this.baseUrl + "/deleteUser/" + id, config).then(res => res.data) }

  getAll() { return axios.get(this.baseUrl + "/getAllUsers", config).then(res => res.data) }

  updatePassword(user) { return axios.put(this.baseUrl + "/updatePassword/" + user.id + "?password=" + user.password, config).then(res => res.data) }

}

export default new UserService();