import axios from "axios";

import Authentication from "lib/api/Authentication";

const USER_API_BASE_URL = "/api/user";

export function signup(userEmail, userNickname, userPassword) {
  let data = {
    userEmail: userEmail,
    userNickname: userNickname,
    userPassword: userPassword,
  };
  const signupInfo = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/signup", signupInfo);
}

export function login(userEmail, userPassword) {
  let data = {
    userEmail: userEmail,
    userPassword: userPassword,
  };
  const loginInfo = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/login", loginInfo);
}

export function emailAuth(userEmail) {
  const data = {
    userEmail: userEmail,
  };
  const emailInfo = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/signup/emailAuth", emailInfo);
}

export function checknickname(userNickname) {
  const data = {
    userNickname: userNickname,
  };
  const nicknameInfo = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/checknickname", nicknameInfo);
}

export function emailAuthForPassword(userEmail) {
  const data = {
    userEmail: userEmail,
  };
  const emailInfo = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/find/emailAuth", emailInfo);
}

export function updatePassword(userEmail, userPassword) {
  const data = {
    userEmail: userEmail,
    userPassword: userPassword,
  };
  const passwordInfo = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/find/update/password", passwordInfo);
}

class UserService {
  findAll() {
    Authentication.setupAxiosInterceptors();
    return axios.get(USER_API_BASE_URL + "/find/all");
  }
  findUser() {
    Authentication.setupAxiosInterceptors();
    return axios.get(USER_API_BASE_URL + "/find");
  }

  updateUserNickname(userNickname) {
    let data = {
      userNickname: userNickname,
    };
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/nickname",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }

  updateUserPassword(userPassword) {
    let data = {
      userPassword: userPassword,
    };
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/password",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  verifyUserPassword(userPassword) {
    let data = {
      userPassword: userPassword,
    };
    Authentication.setupAxiosInterceptors();
    return axios.post(
      USER_API_BASE_URL + "/verify/password",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
          // "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
      }
    );
  }

  deleteUser() {
    Authentication.setupAxiosInterceptors();
    return axios.delete(USER_API_BASE_URL + "/delete", {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  deleteUserByNumber(userNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      USER_API_BASE_URL + "/delete/" + userNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }

  isAdmin() {
    Authentication.setupAxiosInterceptors();
    return axios.get(USER_API_BASE_URL + "/isadmin/", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
}

export default new UserService();
