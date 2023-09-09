import axios from "axios";

class AuthService{

    baseUrl = "http://localhost:8080/auth"

    login(){return axios.post(this.baseUrl + "/login");}

    register(){return axios.post(this.baseUrl + "/register");}

}

export default new AuthService();