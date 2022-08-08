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
export function updatePassword(userId, userPassword) {
  const data = {
    userId: userId,
    userPassword: userPassword,
  };
  const passwordInfo = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/update/password", passwordInfo);
}
export function updateNickname(userId, userNickname) {
  const data = {
    userId: userId,
    userNickname: userNickname,
  };
  const nicknameInfo = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "/update/nickname", nicknameInfo);
}
export function deleteUserByAdmin(userEmail) {
  const data = {
    userEmail: userEmail,
  };
  const deleteInfo = {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": `application/json`,
    },
  };
  return fetch(USER_API_BASE_URL + "delete", deleteInfo);
}
export function deleteUserByItself(userEmail) {
  return fetch(USER_API_BASE_URL + "delete" + userEmail, {
    method: "DELTE",
  });
}
export function findUserById(userId) {
  return fetch(USER_API_BASE_URL + "find" + userId, {
    method: "GET",
  });
}
//아래는 지우지 말기 나중에 axios 만들 때 참고한 뒤 삭제 할 예정

// import axios from "axios";

// const USER_API_BASE_URL = "/api/user";

// class Authentication {
//   //스웨거에서 불러오는 변수 , axios 공부하기
//   signup(userEmail, userNickname, userPassword) {
//     let userData = {
//       userEmail: userEmail,
//       userNickname: userNickname,
//       userPassword: userPassword,
//     };
//     return axios.post(USER_API_BASE_URL + "/signup", JSON.stringify(userData), {
//       headers: {
//         "Content-Type": `application/json`,
//       },
//     });
//   }

//   login(userEmail, userPassword) {
//     let data = {
//       userEmail: userEmail,
//       userPassword: userPassword,
//     };

//     return axios.post(USER_API_BASE_URL + "/login", JSON.stringify(data), {
//       headers: {
//         "Content-Type": `application/json`,
//       },
//     });
//   }
// }
// //delte추가해보기 -> 마이페이지에서 버튼 만들어서 공부
// //아이디 비번 찾기

// export default new Authentication();

// signup.js
// Authentication.signup(userEmail, userNickname, userPassword)
//         .then((response) => {
//           console.log(response);
//           alert("회원가입이 완료되었습니다.");
//           document.location.href = "/login";
//         })
//         .catch(() => {
//           alert("Signup Failed");
//         });

// login.JS
// Authentication.login(userEmail, userPassword)
//   .then((response) => {
//     console.log(response);
//     // setToken();
//     document.location.href = "/";
//     setShowSuccessMessage(true);
//     setHasLoginFailed(false);
//   })
//   .catch(() => {
//     // console.log(error.response)
//     setShowSuccessMessage(false);
//     setHasLoginFailed(true);
//     alert("Login Failed");
//   });
