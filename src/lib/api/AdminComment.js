import axios from "axios";
import Authentication from "./Authentication";
const USER_API_BASE_URL = "https://www.koreanrestaurantji.ga/api/qna/comment";

class AdminComment {
  createComment(questionNumber, comment) {
    Authentication.setupAxiosInterceptors();
    return axios.post(
      USER_API_BASE_URL + "/create/" + questionNumber,
      JSON.stringify(comment),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  findComment(questionNumber) {
    return axios.get(
      USER_API_BASE_URL + "/find/" + questionNumber,
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  updateComment(commentNumber, comment) {
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/" + commentNumber,
      JSON.stringify(comment),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  deleteComment(commentNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      USER_API_BASE_URL + "/delete/" + commentNumber,
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
}
export default new AdminComment();
