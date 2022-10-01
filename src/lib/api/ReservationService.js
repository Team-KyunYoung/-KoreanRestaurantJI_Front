import axios from "axios";
import Authentication from "./Authentication";

const RESERVATION_API_BASE_URL = "/api/reservation";
class ReservationService {
  createReservation(
    date,
    name,
    phoneNumber,
    userRequest,
    roomNumber,
    tableCount,
    time
  ) {
    let data = {
      reservationDate: date,
      reservationName: name,
      reservationPhoneNumber: phoneNumber,
      reservationRequest: userRequest,
      reservationRoomNumber: roomNumber,
      reservationTableCount: tableCount,
      reservationTime: time,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.post(RESERVATION_API_BASE_URL + "/create", JSON.stringify(data), {
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
    return axios.get(RESERVATION_API_BASE_URL + "/find/after", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  findReservationToday() {
    Authentication.setupAxiosInterceptors();
    return axios.get(RESERVATION_API_BASE_URL + "/find/today", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  updateReservation(reservationNumber, date, name, phoneNumber, userRequest, roomNumber, tableCount, time) {
    let data = {
      reservationDate: date,
      reservationName: name,
      reservationPhoneNumber: phoneNumber,
      reservationRequest: userRequest,
      reservationRoomNumber: roomNumber,
      reservationTableCount: tableCount,
      reservationTime: time,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.post(RESERVATION_API_BASE_URL + "/update/" + reservationNumber, 
    JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  deleteReservation(reservationNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      RESERVATION_API_BASE_URL + "/delete/" + reservationNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
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
