import axios from "axios";
import Authentication from "./Authentication";

const USER_API_BASE_URL = "/api/reservation";
class ReservationService {
  createReservation(
    date,
    name,
    phoneNumber,
    roomNumber,
    tableCount,
    time
    // reservationRequest
  ) {
    let data = {
      reservationDate: date,
      reservationName: name,
      reservationPhoneNumber: phoneNumber,
      reservationRoomNumber: roomNumber,
      reservationTableCount: tableCount,
      reservationTime: time,
      // reservationRequest: reservationRequest,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.post(USER_API_BASE_URL + "/create", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  findBeforeReservation() {
    Authentication.setupAxiosInterceptors();
    return axios.get(USER_API_BASE_URL + "/find/before", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  findAfterReservation() {
    Authentication.setupAxiosInterceptors();
    return axios.get(USER_API_BASE_URL + "/find/after", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  updateReservation(
    date,
    name,
    phoneNumber,
    reservationRequest,
    roomNumber,
    tableCount,
    time
  ) {
    let data = {
      reservationDate: date,
      reservationName: name,
      reservationPhoneNumber: phoneNumber,
      reservationRequest: reservationRequest,
      reservationRoomNumber: roomNumber,
      reservationTableCount: tableCount,
      reservationTime: time,
    };
    Authentication.setupAxiosInterceptors();
    return axios.update(
      USER_API_BASE_URL + "/update/" + roomNumber,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  deleteReservation(roomNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      USER_API_BASE_URL + "/delete/" + roomNumber,
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
}
export default new ReservationService();
