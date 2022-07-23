import axios from "axios";

const USER_API_BASE_URL = "/api/user"

class Authentication {

    signup(userEmail, userNickname, userPassword) {
      let userData = {
        userEmail: userEmail,
        userNickname: userNickname,
        userPassword: userPassword,
      }
      return axios.post(USER_API_BASE_URL + "/signup", JSON.stringify(userData), {
        headers: {
          "Content-Type": `application/json`,
        },
      });
    }

    login(userEmail, userPassword) {
      let data = {
        userEmail: userEmail,
        userPassword: userPassword
      }
      
      return axios.post(USER_API_BASE_URL + "/login", JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
    }
}

export default new Authentication()