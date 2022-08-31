import axios from "axios";

const USER_API_BASE_URL = "/api/question";

class Question {
  findAllFAQ() {
    return axios.get(USER_API_BASE_URL + "/find/public/faq");
  }
  findAllQnA() {
    return axios.get(USER_API_BASE_URL + "/find/public/qna");
  }

  findFAQAnswer(questionNumber) {
    let data = {
      questionNumber: questionNumber,
    };
    return axios.get(
      USER_API_BASE_URL + "/find/public/faq/questionNumber",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
          "X-AUTH-TOKEN": localStorage.getItem("token"),
        },
      }
    );
  }
  findQnAAnswer(questionNumber) {
    let data = {
      questionNumber: questionNumber,
    };
    return axios.get(
      USER_API_BASE_URL + "/find/public/faq/questionNumber",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
          "X-AUTH-TOKEN": localStorage.getItem("token"),
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
    return axios.post(USER_API_BASE_URL + "/create/qna", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
  }
}

export default new Question();
