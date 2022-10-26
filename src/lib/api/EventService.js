import axios from "axios";
import Authentication from "./Authentication";
const USER_API_BASE_URL = "/api/event";
class EventService {
  createEvent(eventContents, eventImage, eventTitle) {
    let data = {
      eventContents: eventContents,
      eventImage: eventImage,
      eventTitle: eventTitle,
    };
    Authentication.setupAxiosInterceptors();
    return axios.post(USER_API_BASE_URL + "/create", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  deleteEvent(eventNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      USER_API_BASE_URL + "/delete/" + eventNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }
  findEvent(eventNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.get(
      USER_API_BASE_URL + "/find/" + eventNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }
  findAllEvent() {
    return axios.get(USER_API_BASE_URL + "/find", JSON.stringify(), {
      headers: { "Content-Type": `application/json` },
    });
  }
  updateEvent(eventNumber, eventContents, eventImage, eventTitle) {
    let data = {
      eventContents: eventContents,
      eventImage: eventImage,
      eventTitle: eventTitle,
    };
    Authentication.setupAxiosInterceptors();
    return axios.put(
      USER_API_BASE_URL + "/update/" + eventNumber,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
}
export default new EventService();
