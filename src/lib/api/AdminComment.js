import axios from "axios";
import Authentication from "./Authentication";
const USER_API_BASE_URL = "/api/qna/comment";
class AdminComment {
  createComment(questionNumber, comment) {
    // let data = {
    //   comment: comment,
    //  };
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
    Authentication.setupAxiosInterceptors();
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
    let data = {
      comment: comment,
    };
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/qna/" + commentNumber,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  deleteComment(commentNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.get(
      USER_API_BASE_URL + "/find/" + commentNumber,
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
