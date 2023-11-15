import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper"
import { builderParams } from "../helper/builder.params"

class NotificationService {

  baseUrl = BASE_URL + "/api/v1/notification";

  getAllByUserAndShop(request) {
    const params = builderParams(request)
    return axios.get(this.baseUrl + "/getAllNotifications?" + params, config).then(res => res.data) 
  }

  getAllReadByUserAndShop(request) {
    const params = builderParams(request)
    return axios.get(this.baseUrl + "/getAllReadNotifications?" + params, config).then(res => res.data) 
  }

  markAsRead(id) {return axios.put(this.baseUrl + "/markasread/" + id).then(res => res.data) }

  delete(id) {return axios.delete(this.baseUrl + "/deleteNotification/" + id).then(res => res.data) }

  markSelectedAsRead(notifications) {return axios.put(this.baseUrl + "/markNotificationsAsRead", notifications).then(res => res.data) }

  deleteSelected(notifications) {return axios.put(this.baseUrl + "/deleteNotifications", notifications).then(res => res.data) }

}

export default new NotificationService();