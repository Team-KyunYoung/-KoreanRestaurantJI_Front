import axios from "axios";
import Authentication from "./Authentication";
const USER_API_BASE_URL = "/api/question";

class Question {
  findAllFAQ() {
    return axios.get(USER_API_BASE_URL + "/find/public/faq");
  }
  findAllQnA() {
    return axios.get(USER_API_BASE_URL + "/find/public/qna");
  }
  findPrivateQnAAnswer(questionNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.get(
      USER_API_BASE_URL + "/find/private/qna/" + questionNumber,
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  findPublicQnAAnswer(questionNumber) {
    return axios.get(USER_API_BASE_URL + "/find/public/qna/" + questionNumber);
  }
  updateQnA(questionNumber, isPrivate, questionContents, questionTitle) {
    let data = {
      isPrivate: isPrivate,
      questionContents: questionContents,
      questionTitle: questionTitle,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/qna/" + questionNumber,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  updateFaq(questionNumber, questionContents, questionTitle) {
    let data = {
      questionContents: questionContents,
      questionTitle: questionTitle,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/faq/" + questionNumber,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  createQnA(isPrivate, questionContents, questionTitle) {
    let data = {
      isPrivate: isPrivate,
      questionContents: questionContents,
      questionTitle: questionTitle,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.post(USER_API_BASE_URL + "/create/qna", JSON.stringify(data), {
      headers: {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
  }
  createFaq(questionContents, questionTitle) {
    let data = {
      questionContents: questionContents,
      questionTitle: questionTitle,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.post(USER_API_BASE_URL + "/create/faq", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  deleteQnA(questionNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      USER_API_BASE_URL + "/delete/" + questionNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }
}

export default new Question();
