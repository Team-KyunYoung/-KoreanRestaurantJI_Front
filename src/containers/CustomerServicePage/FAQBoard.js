import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
const InnerFAQ = (props) => {
  console.log(props.list);
  const questionList = [];
  props.list.map((obj) =>
    questionList.push(
      <Accordion.Item eventKey={obj.questionNumber}>
        <Accordion.Header>{obj.questionTitle}</Accordion.Header>
        <Accordion.Body>{obj.questionContents}</Accordion.Body>
      </Accordion.Item>
    )
  );
  return <>{questionList}</>;
};
const FAQBoard = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Question.findAllFAQ().then((response) => {
      console.log(response);
      setList(response.data.data);
      setIsLoading(false);
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
                <InnerFAQ list={list} />
              </Accordion>
            </div>
          )}
          <div className={styles.btn}>
            <Link to="/QnA">FAQ에 없다면?</Link>
          </div>
        </section>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default FAQBoard;
