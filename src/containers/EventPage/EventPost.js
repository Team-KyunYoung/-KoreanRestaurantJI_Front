import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaQuery from "react-responsive";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
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
      .catch((error) => {
        console.log(error);
      });
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
    <div id="EventPostPage">
      <Header />
      <main className={styles.container}>
        <div>
          {isLoading ? (
            ""
          ) : (
            <section className={styles.postBox}>
              <div className={styles.banner}>
                <img src={image1} alt={list.eventTitle} />
                {/*<img src={list.eventImage} alt={list.eventTitle} />*/}
              </div>
              <div className={styles.contents}>
                <MediaQuery minWidth={993}>
                  <h2>Event Post</h2>
                </MediaQuery>
                <div className={styles.editProfile}>
                  <h1>{list.eventTitle}</h1>
                  <div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-calendar"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg>{" "}
                      {list.writeDate}
                    </span>
                    {"     "}
                    <span>
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
                      {list.eventView}
                    </span>
                  </div>
                  <p className={styles.details}>{list.eventContents}</p>
                </div>
                {isAdmin ? (
                  <div className={styles.btn}>
                    <button type="button" onClick={updateEventPost}>
                      수정하기
                    </button>
                    <button type="button" onClick={deleteEventPost}>
                      삭제하기
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default EventPost;
