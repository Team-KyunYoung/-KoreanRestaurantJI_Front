import axios from "axios";

class Authentication {
  loginTokenSave(token) {
    console.log("===login Token Save===")
    localStorage.setItem('token', token)
    this.setupAxiosInterceptors()
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['X-AUTH-TOKEN'] = token;
          //X-AUTH-TOKEN으로 다른 url 이용할 때 헤더로 넣어줘야한다.
        }
        return config;
      },
      error => {
        Promise.reject(error)
      });
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    console.log("===UserloggedInCheck===");
    console.log(token);

    if(token) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export default new Authentication();