import React from "react";
import styles from "./Reservation.module.scss";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import * as Authentication from "lib/api/Authentication";
//import logo from '../../assets/<파일명>';
//import SubmitBtn from "../../components/<컴포넌트명>";

const Reservation = () => {
  return (
    <div id="ReservationDetail">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
};

export default Reservation;
