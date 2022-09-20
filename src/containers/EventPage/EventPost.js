import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Event.module.scss";
import UserService from "lib/api/UserService";
import EventService from "lib/api/EventService";

const image1 = "https://picsum.photos/500/600";
const EventPost = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const param = useParams();
  const navigate = useNavigate();
  console.log(param.number);
  useEffect(() => {
    alert(param.number);
    EventService.findEvent(Number(param.number))
      .then((response) => {
        console.log(response);
        setList(response.data.data);
        setIsLoading(false);
      })
      .catch(() => {});
    UserService.isAdmin()
      .then((response) => {
        console.log(response);
        if (response.data.data === true) {
          setIsAdmin(true);
          console.log("admin");
        }
      })
      .catch(() => {});
  }, []);
  const updateEventPost = () => {
    navigate("/Event/Update/" + param.number);
  };
  const deleteEventPost = () => {
    EventService.deleteEvent(Number(param.number))
      .then((response) => {
        window.location.replace("/Event");
      })
      .catch(() => {});
  };
  return (
    <div id="EventPage">
      <Header />
      <main className={styles.container}>
        <ImgBanner
          img={image1}
          pageTitle="Event"
          pageDetails="Lorem Ipsum is simply dummy text of the printing and typesetting
    industry."
        />
        <section className={styles.eventBox}>
          {isLoading ? (
            ""
          ) : (
            <div className={styles.eventPost}>
              <h1>{list.eventTitle}</h1>
              <p>
                {list.writeDate}
                {list.eventView}
              </p>
              {/*<img src={list.eventImage} alt={list.eventTitle} />*/}
              <img src={image1} alt={list.eventTitle} />
              <p>{list.eventContents}</p>
            </div>
          )}
        </section>
        <section className={styles.eventBox}>
          {isAdmin ? (
            <div className={styles.btn}>
              <button type="submit" onClick={updateEventPost}>
                수정하기
              </button>
              <button type="button" onClick={deleteEventPost}>
                삭제하기
              </button>
            </div>
          ) : (
            ""
          )}
        </section>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default EventPost;
