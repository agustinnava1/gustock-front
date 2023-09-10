import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

class AuthService{

    baseUrl = BASE_URL + "/auth";

    login(userDetail){return axios.post(this.baseUrl + "/login", userDetail);}

    register(userDetail){return axios.post(this.baseUrl + "/register", userDetail)}

}

export default new AuthService();
