import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Booking.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import RoomService from "lib/api/RoomService"; //import logo from '../../assets/<파일명>';
//import SubmitBtn from "../../components/<컴포넌트명>";
function RemainSeatsByTime(data) {
  const res = data.data.roomStatus;
  var seat = [
    { id: 1, time: "11:00", remain: 15 },
    { id: 2, time: "12:00", remain: 15 },
    { id: 3, time: "13:00", remain: 15 },
  ];
  console.log(data.data.roomStatus.length);
  console.log(res);
  // reservationTime: '16:00', roomRemaining: 11
  for (let i = 0; i < res.length; i++) {
    console.log();
    if (res[i].roomRemaining < 4) {
      switch (res[i].reservationTime) {
        case "11:00":
      }
    }
  }
}
const SelectMore = () => {
  const roomParams = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [roomStatus, setRoomStatus] = useState([]);

  const [date, setDate] = useState();

  useEffect(() => {
    RoomService.findWithRoomNumber(roomParams.roomNumber).then((response) => {
      console.log(response);
      setRoomStatus(response.data);
      setIsLoading(false);
    });
  }, []);

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    //date가 바뀔 때만 검사
    RoomService.findWithRoomNumberAndDate(roomParams.roomNumber, date).then(
      (response) => {
        console.log(response);
        RemainSeatsByTime(response.data);
      }
    );
  }, [date]);
  return (
    <div id="ReservationDetail">
      <Header />
      <main>
        <div className={styles.container}>
          <header>
            <h1>{roomParams.roomName}</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </header>
          <div className={styles.reservationFormBox}>
            <form>
              <input type="date" onChange={onChangeDate} />
              <select>
                <option value="11o">11:00</option>
                <option value="12o">12:00</option>
                <option value="13o">13:00</option>
                <option value="14o">14:00</option>
                <option value="15o">15:00</option>
                <option value="16o">16:00</option>
                <option value="17o">17:00</option>
                <option value="18o">18:00</option>
                <option value="19o">19:00</option>
                <option value="20o">20:00</option>
                <option value="21o">21:00</option>
              </select>
              <select>
                <option value="2p">2인</option>
                <option value="4p">4인</option>
                <option value="8p">5-8인</option>
                <option value="12p">9-12인</option>
              </select>
              <div>
                <button type="submit">예약하기</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default SelectMore;
