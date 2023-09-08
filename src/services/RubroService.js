import axios from "axios";

class RubroService{

    baseUrl = "http://localhost:8080/rubro"

    getAll(){return axios.get(this.baseUrl).then(res => res.data.data);}

    getById(){return axios.get(this.baseUrl + "/" + rubroId);}

    create(){return axios.post(this.baseUrl + "/crear" + rubro)}

    update(){return axios.put(this.baseUrl + "/modificar/" + rubroId)}

    delete(){return axios.delete(this.baseUrl + "/eliminar/" + rubroId)}

}

export default new RubroService();

