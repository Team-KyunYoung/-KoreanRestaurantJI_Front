import axios from "axios";
import Authentication from "./Authentication";
const REVIEW_API_BASE_URL = "/api/review";

class ReviewService {
    createReview(Contents, Image) {
      let data = {
        reviewContents: Contents,
        reviewImage: Image,
      };
      Authentication.setupAxiosInterceptors();
      return axios.post(
        REVIEW_API_BASE_URL + "/create", JSON.stringify(data),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
    }

    findAllReview() {
        return axios.get(REVIEW_API_BASE_URL + "/find");
    }

    updateReview(reviewNumber, Contents, Image) {
      let data = {
        reviewContents: Contents,
        reviewImage: Image,
      };
      Authentication.setupAxiosInterceptors();
      return axios.put(
        REVIEW_API_BASE_URL + "/update/" + reviewNumber,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
    }

    deleteReview(reviewNumber) {
      Authentication.setupAxiosInterceptors();
      return axios.delete(
        REVIEW_API_BASE_URL + "/delete/" + reviewNumber,
        JSON.stringify(),
        {
          headers: { "Content-Type": `application/json` },
        }
      );
    }
  }
  export default new ReviewService();