import axios from "axios";

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
    return axios.post(USER_API_BASE_URL + "/create", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      },
    });
  }
}
export default new ReservationService();
