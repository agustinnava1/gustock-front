import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper"
import { builderParams } from "../helper/builder.params"

class NotificationService {

  baseUrl = BASE_URL + "/api/v1/notification";

  getAllByUserAndShop(request) {
    const params = builderParams(request)
    return axios.get(this.baseUrl + "/list?" + params, config).then(res => res.data) 
  }

  getAllReadByUserAndShop(request) {
    const params = builderParams(request)
    return axios.get(this.baseUrl + "/list/read?" + params, config).then(res => res.data) 
  }

  markAsRead(id) {return axios.post(this.baseUrl + "/markasread/" + id).then(res => res.data) }

  delete(id) {return axios.delete(this.baseUrl + "/delete/" + id).then(res => res.data) }

}

export default new NotificationService();