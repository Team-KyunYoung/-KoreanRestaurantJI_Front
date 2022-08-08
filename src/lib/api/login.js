import React from "react";
import axios from "axios";

const USER_API_BASE_URL = "/api/user";
const login = (userEmail, userPassword) => {
  let data = {
    userEmail: userEmail,
    userPassword: userPassword,
  };

  return axios.post(USER_API_BASE_URL + "/login", JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

export default login;
