import axios from "axios";

class Authentication {
  loginTokenSave(token) {
    console.log("===login Token Save===")
    //로컬 스토리지에 유효시간(6시간) 추가하여 저장.
    const item = {
      value: token,
      expire: Date.now() + 21600000,
    } 
    localStorage.setItem('token', JSON.stringify(item))
    this.setupAxiosInterceptors()
  }

  setupAxiosInterceptors() {
    axios.interceptors.request.use(
      config => {
        const obj = localStorage.getItem('token');
        const token = JSON.parse(obj).value;
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
    const localStorageData = localStorage.getItem('token');
    console.log("===UserloggedInCheck===");

    if(localStorageData) {
      // 현재 시간과 localStorage의 expire 시간 비교
      if( Date.now() > JSON.parse(localStorageData).expire) {    
        console.log("로그인 유효시간이 지나 로그아웃 됩니다.")
        // 만료시간이 지난 item 삭제    
        localStorage.removeItem('token');
        return false;
      }
      console.log(JSON.parse(localStorageData).value);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export default new Authentication();