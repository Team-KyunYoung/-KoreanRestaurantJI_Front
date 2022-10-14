import React, { useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

import { FaMapMarkerAlt, FaPhoneAlt, FaBus } from "react-icons/fa";

import styles from "./Map.module.scss";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";

const Map = () => {
  return (
    <div className="MapPage">
      <Header />

      <main>
        <div className={styles.content}>
          <header className={styles.title}></header>
          <section className={styles.main}>
            <div className={styles.contents}>
              <div className={styles.description}>
                <h2>오시는 길</h2>
                <span>
                  <FaMapMarkerAlt /> '智'의 주소를 표기합니다.
                </span>
                <br />
                <span>
                  <FaPhoneAlt /> '智'의 대표 전화번호를 표기합니다.
                </span>
                <br />
                <span>
                  <FaBus /> (ex) 지하철 8호선, 330, 440, 3012, ...{" "}
                </span>
              </div>
              <div className={styles.map}>
                <RenderAfterNavermapsLoaded ncpClientId={"14rlapbxs9"}>
                  <NaverMap
                    id={"map"}
                    mapDivId={"react-naver-map"} // default name
                    style={{ width: "100%", height: "100%" }}
                    defaultCenter={{ lat: 37.579887, lng: 126.97687 }}
                    defaultZoom={15}
                  >
                    <Marker
                      position={{ lat: 37.579887, lng: 126.97687 }}
                      animation={Animation.BOUNCE}
                      onClick={() => {
                        alert("한식당 智의 가상의 위치입니다.");
                      }}
                    />
                  </NaverMap>
                </RenderAfterNavermapsLoaded>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default Map;
