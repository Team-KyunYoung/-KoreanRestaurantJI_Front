import React from "react";
import styles from "./Booking.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import * as Authentication from "lib/api/Authentication";
//import logo from '../../assets/<파일명>';
//import SubmitBtn from "../../components/<컴포넌트명>";

const SelectMore = () => {
  return (
    <div id="ReservationDetail">
      <Header />
      <main>
        <div className={styles.container}>
          <header>
            <h1>Room name</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </header>
          <div className={styles.reservationFormBox}>
            <form>
              <input type="date" />
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
