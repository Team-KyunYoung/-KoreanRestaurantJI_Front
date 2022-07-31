import axios from "axios";

const USER_API_BASE_URL = "/api/user"

class Authentication {
//스웨거에서 불러오는 변수 , axios 공부하기
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
//delte추가해보기 -> 마이페이지에서 버튼 만들어서 공부
//아이디 비번 찾기

export default new Authentication()