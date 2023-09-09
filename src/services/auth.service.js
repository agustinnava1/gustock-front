import { myAxios } from "../helper/AxionHelper";

export const login = (userDetail) => {
  return myAxios.post("/auth/login", userDetail)
}