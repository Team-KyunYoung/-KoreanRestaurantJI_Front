import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
import UserService from "lib/api/UserService";
const InnerFAQ = (props) => {
  const navigate = useNavigate();
  const updateFaq = (e) => {
    navigate("./update/" + e.target.id);
  };
  const deleteFaq = (e) => {
    Question.deleteQnA(Number(e.target.id))
      .then((response) => {
        window.location.replace("/FAQBoard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(props.list);
  const questionList = [];
  props.list.map((obj, i) =>
    questionList.push(
      <div className={styles.faqBox}>
        <Accordion.Item eventKey={obj.questionNumber} key={i}>
          <Accordion.Header className={styles.accordionHeader}>
            {obj.questionTitle}
            {props.isAdmin ? (
              <>
                <button
                  className={styles.sideBySide}
                  type="submit"
                  id={obj.questionNumber}
                  key={obj.questionNumber}
                  onClick={updateFaq}
                >
                  수정
                </button>
                <button
                  className={styles.sideBySide}
                  type="submit"
                  id={obj.questionNumber}
                  onClick={deleteFaq}
                >
                  삭제
                </button>
              </>
            ) : (
              ""
            )}
          </Accordion.Header>
          <Accordion.Body>{obj.questionContents} </Accordion.Body>
        </Accordion.Item>
      </div>
    )
  );
  return <>{questionList}</>;
};
const FAQBoard = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    Question.findAllFAQ()
      .then((response) => {
        console.log(response);
        setList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <div id="FAQPage">
      <Header />
      <main className={styles.container}>
        <header>
          <h1>FAQ</h1>
          <p>
            Counting objects: 100% (28/28), done. Delta compression using up to
            8 threads Compressing objects: 100% (18/18), done. Writing objects:
            100% (18/18), 2.09 KiB
          </p>
        </header>
        <section className={styles.accordionBox}>
          {isLoading ? (
            "loading"
          ) : (
            <div>
              <Accordion defaultActiveKey="0">
                <InnerFAQ list={list} isAdmin={isAdmin} />
              </Accordion>
            </div>
          )}
          <div className={styles.btn}>
            {isAdmin ? (
              <>
                <Link to="./create/0">게시하기</Link>
              </>
            ) : (
              <Link to="/QnABoard">FAQ에 없다면?</Link>
            )}
          </div>
        </section>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default FAQBoard;
