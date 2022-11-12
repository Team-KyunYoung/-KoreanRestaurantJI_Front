import axios from "axios";
import Authentication from "./Authentication";

const RESERVATION_API_BASE_URL =
  "https://www.koreanrestaurantji.ga/api/reservation";

class ReservationService {
  createReservation(
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
    return axios.post(
      RESERVATION_API_BASE_URL + "/create",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  findBeforeReservation() {
    Authentication.setupAxiosInterceptors();
    return axios.get(
      RESERVATION_API_BASE_URL + "/find/before",
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  findAfterReservation() {
    Authentication.setupAxiosInterceptors();
    return axios.get(
      RESERVATION_API_BASE_URL + "/find/after",
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  findReservationToday() {
    Authentication.setupAxiosInterceptors();
    return axios.get(
      RESERVATION_API_BASE_URL + "/find/today",
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  updateReservation(
    date,
    name,
    phoneNumber,
    reservationRequest,
    reservationRoomName,
    tableCount,
    time,
    reservationNumber
  ) {
    let data = {
      reservationDate: date,
      reservationName: name,
      reservationPhoneNumber: phoneNumber,
      reservationRequest: reservationRequest,
      reservationRoomName: reservationRoomName,
      reservationTableCount: tableCount,
      reservationTime: time,
    };
    Authentication.setupAxiosInterceptors();
    return axios.put(
      RESERVATION_API_BASE_URL + "/update/" + reservationNumber,
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
      RESERVATION_API_BASE_URL + "/delete/" + roomNumber,
      JSON.stringify(),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  deleteReservationBeforeLimitDate() {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      RESERVATION_API_BASE_URL + "/delete/beforeLimitDate",
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }
}
export default new ReservationService();
