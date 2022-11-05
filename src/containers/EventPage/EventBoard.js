import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ImgBanner from "components/Banner/ImgBanner";
import Chat from "components/ChatBot/Chat";
import styles from "./Event.module.scss";
import UserService from "lib/api/UserService";
import EventService from "lib/api/EventService";

const image1 = "https://picsum.photos/800/600";
function InnerEvent(props) {
  const questionList = [];
  props.list.map((obj, i) =>
    questionList.push(
      <Link
        to={"/Event/Post/" + obj.eventNumber}
        key={i}
        className={styles.singleEvent}
      >
        <div className={styles.eventContent}>
          <div>
            <img src={obj.eventImage} alt={obj.eventTitle} />
          </div>
          <div>
            <span className={styles.title}>{obj.eventTitle}</span>
            <span className={styles.date}>
              이벤트 기간 : {obj.writeDate} ~{" "}
            </span>
            <span className={styles.view}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>{" "}
              {obj.eventView}
            </span>
          </div>
        </div>
        <span className={styles.shortcut}>바로가기</span>
        <span className={styles.description}>{obj.eventTitle}</span>
      </Link>
    )
  );
  return <>{questionList}</>;
}
const EventBoard = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    EventService.findAllEvent()
      .then((response) => {
        setList(response.data.data);
        setIsLoading(false);
      })
      .catch(() => {});
    UserService.isAdmin()
      .then((response) => {
        if (response.data.data === true) {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div id="EventBoardPage">
      <Header />
      <main className={styles.container}>
        <ImgBanner
          img={image1}
          pageTitle="Event"
          pageDetails="智가 현재 진행하고 있는 이벤트입니다."
        />
        <section className={styles.eventBox}>
          {isLoading ? (
            "loading"
          ) : (
            <div className={styles.event}>
              <InnerEvent list={list} />
            </div>
          )}
        </section>
        {isAdmin ? (
          <section className={styles.eventBox}>
            <div className={styles.btn}>
              <Link to="/Event/Create/0">글 쓰기</Link>
            </div>
          </section>
        ) : (
          ""
        )}
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default EventBoard;
