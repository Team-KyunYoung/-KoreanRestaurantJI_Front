import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import styles from "./Booking.module.scss";
import RoomService from "lib/api/RoomService";
//import logo from '../../assets/<파일명>';
//import SubmitBtn from "../../components/<컴포넌트명>";
function RoomContent(data) {
  const roomList = [];

  for (let i = 0; i < data.data.length; i++) {
    roomList.push(
      <div key={i}>
        <Link
          to={
            "/SelectMore/" +
            data.data[i].roomNumber +
            "/" +
            data.data[i].roomName
          }
        >
          <img src="https://picsum.photos/300/600" alt="room1" />
          <h3>{data.data[i].roomName}</h3>
          {/* <p>마우스를 올려보세요</p>
    <button type="submit">예약하기</button> */}
        </Link>
      </div>
    );
  }
  return <>{roomList}</>;
}
const SelectRoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [roomRes, setRoomRes] = useState([]);
  useEffect(() => {
    console.log("Booking PAGE LOADING");
    RoomService.findAllRoom().then((response) => {
      console.log(response);
      setRoomRes(response.data.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div id="ReservationDetail">
      <Header />
      <main>
        <div className={styles.container}>
          <header>
            <h1>reservation</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </header>
          <div className={styles.roomContainer}>
            {isLoading ? "Loading" : <RoomContent data={roomRes} />}
          </div>
        </div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default SelectRoom;
