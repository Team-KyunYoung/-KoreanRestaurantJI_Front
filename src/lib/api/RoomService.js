import axios from "axios";

import Authentication from "lib/api/Authentication";

const ROOM_API_BASE_URL = "/api/room";

class RoomService {
  createRoom(roomName, roomImg) {
    let data = {
      roomName: roomName,
      roomImg: roomImg
    };
    Authentication.setupAxiosInterceptors();
    return axios.post(ROOM_API_BASE_URL + "/create", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  findAllRoom() {
    return axios.get(ROOM_API_BASE_URL + "/find/room");
  }
  findWithRoomNumber(roomNumber) {
    return axios.get(ROOM_API_BASE_URL + "/find/" + roomNumber);
  }
  findWithRoomNumberAndDate(roomNumber, date) {
    let data = {
      reservationDate: date,
    };
    console.log(JSON.stringify(data));
    return axios.post(
      ROOM_API_BASE_URL + "/find/" + roomNumber + "/date",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }

  searchRoom(roomName) {
    let data = {
      input: roomName
    };
    Authentication.setupAxiosInterceptors();
    return axios.post(ROOM_API_BASE_URL + "/search", JSON.stringify(data), {
      headers: {
        "Content-Type": `application/json`,
      },
    });
  }

  deleteRoom(roomNumber) {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      ROOM_API_BASE_URL + "/delete/" + roomNumber,
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }

  deleteRoomStatusBeforeToday() {
    Authentication.setupAxiosInterceptors();
    return axios.delete(
      ROOM_API_BASE_URL + "/delete/beforeToday",
      JSON.stringify(),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
  }
}

export default new RoomService();
