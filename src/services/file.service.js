import axios from "axios";
import { BASE_URL, config } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/api/v1/file";

class FileService {

    getProductImage(imageName) { return axios.get(baseUrl + "/getProductImage/" + imageName, config).then(res => res.data) }

}

export default new FileService();