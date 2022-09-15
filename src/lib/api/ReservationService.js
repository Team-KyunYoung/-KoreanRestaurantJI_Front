import axios from "axios";

import Authentication from "lib/api/Authentication";

const USER_API_BASE_URL = "/api/reservation";
class ReservationService {
  createReservation(date, name, phoneNumber, roomNumber, tableCount, time) {
    let data = {
      reservationDate: date,
      reservationName: name,
      reservationPhoneNumber: phoneNumber,
      reservationRoomNumber: roomNumber,
      reservationTableCount: tableCount,
      reservationTime: time,
    };
    console.log(data);
    Authentication.setupAxiosInterceptors();
    return axios.post(USER_API_BASE_URL + "/create", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
  findReservation() {
    Authentication.setupAxiosInterceptors();
    return axios.get(USER_API_BASE_URL + "/find", JSON.stringify(), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }
}
export default new ReservationService();
