import React from "react";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import styles from "./Booking.module.scss";
import * as Authentication from "lib/api/Authentication";
//import logo from '../../assets/<파일명>';
//import SubmitBtn from "../../components/<컴포넌트명>";

const SelectRoom = () => {
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
            <div>
              <img
                onClick={() => {
                  window.location.href = "/SelectMore";
                }}
                src="https://picsum.photos/300/600"
                alt="room1"
              />
              <h3>Lorem Ipsum</h3>
              {/* <p>마우스를 올려보세요</p>
              <button type="submit">예약하기</button> */}
            </div>
            <div>
              <img
                href="/selectMore"
                src="https://picsum.photos/300/600"
                alt="room2"
              />
              <h3>is simply dummy</h3>
            </div>
            <div>
              <img src="https://picsum.photos/300/600" alt="room1" />
              <h3>text</h3>
            </div>
            <div>
              <img src="https://picsum.photos/200/600" alt="room1" />
              <h3>of</h3>
            </div>
            <div>
              <img src="https://picsum.photos/200/600" alt="room1" />
              <h3>the printing</h3>
            </div>
          </div>
        </div>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default SelectRoom;
