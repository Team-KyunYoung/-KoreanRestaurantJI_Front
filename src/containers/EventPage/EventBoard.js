import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
import styles from "./Event.module.scss";
import UserService from "lib/api/UserService";
import EventService from "lib/api/EventService";

function InnerEvent(props) {
  console.log(props.list.length);
  const questionList = [];
  props.list.map((obj, i) =>
    questionList.push(
      <Link to={"/Event/" + obj.eventNumber} key={i}>
        <div id="tr">
          <div>{obj.eventNumber}</div>
          <div>{obj.eventTitle}</div>
          <div>{obj.writeDate}</div>
          <div>{obj.eventView}</div>
        </div>
      </Link>
    )
  );
  return (
    <div id="tbody" className={styles.tbody}>
      {questionList}
    </div>
  );
}
const EventBoard = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    EventService.findAllEvent()
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
  return (
    <div id="EventPage">
      <Header />
      <main className={styles.container}>
        <header>
          <h1>Event</h1>
          <p>
            Counting objects: 100% (28/28), done. Delta compression using up to
            8 threads Compressing objects: 100% (18/18), done. Writing objects:
            100% (18/18), 2.09 KiB
          </p>
        </header>
        <section className={styles.eventBox}>
          {isLoading ? (
            "loading"
          ) : (
            <div id="table" className={styles.table}>
              <div id="thead" className={styles.thead}>
                <div id="tr">
                  <div>번호</div>
                  <div>제목</div>
                  <div>날짜</div>
                  <div>조회수</div>
                </div>
              </div>
              <InnerEvent list={list} />
            </div>
          )}
        </section>
        {isAdmin ? (
          <section className={styles.eventBox}>
            <div className={styles.btn}>
              <Link to="/Event/Create">글 쓰기</Link>
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
