import axios from "axios";
import { BASE_URL } from "../helper/AxionHelper";

const baseUrl = BASE_URL + "/auth";

class AuthService{

    login(userDetail){return axios.post(baseUrl + "/login", userDetail).then(res => res.data);}

    register(userDetail){return axios.post(baseUrl + "/register", userDetail)}

}

export default new AuthService();
