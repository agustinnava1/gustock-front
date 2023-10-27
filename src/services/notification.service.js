import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper"
import { builderParams } from "../helper/builder.params"

class NotificationService {

  baseUrl = BASE_URL + "/notification";

  getAllByUserAndShop(request) {
    const params = builderParams(request)
    return axios.get(this.baseUrl + "/list?=" + params, config).then(res => res.data) 
  }

  delete(id) { return axios.delete(this.baseUrl + "/eliminar/" + id).then(res => res.data) }

}

export default new NotificationService();