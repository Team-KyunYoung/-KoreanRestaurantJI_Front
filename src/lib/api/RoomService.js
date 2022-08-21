import axios from "axios";

const USER_API_BASE_URL = "/api/room";

class RoomService {
  findAllRoom() {
    return axios.get(USER_API_BASE_URL + "/find/room");
  }
  findWithRoomNumber(roomNumber) {
    return axios.get(USER_API_BASE_URL + "/find/" + roomNumber);
  }
  findWithRoomNumberAndDate(roomNumber, date) {
    let data = {
      reservationDate: date,
    };
    console.log(JSON.stringify(data));
    return axios.post(
      USER_API_BASE_URL + "/find/" + roomNumber + "/date",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
}
const login = (userEmail, userPassword) => {
  let data = {
    userEmail: userEmail,
    userPassword: userPassword,
  };

  return axios.post(USER_API_BASE_URL + "/login", JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
export default new RoomService();
