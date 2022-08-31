import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import Page from "../../components/Pagination/Pagination";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
function InnerQnA(props) {
  console.log(props.list.length);
  const questionList = [];
  props.list.map((obj) =>
    questionList.push(
      <Link to={"./" + obj.questionNumber}>
        <div id="tr">
          <div>{obj.questionNumber}</div>
          <div>{obj.questionTitle}</div>
          <div>{obj.writeDate}</div>
          <div>{obj.writer}</div>
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
const QnA = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  console.log(indexOfFirst, indexOfLast);
  const currentPosts = (posts) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    console.log("현재 포스트는 : " + currentPosts);
    return currentPosts;
  };
  useEffect(() => {
    Question.findAllQnA().then((response) => {
      console.log(response.data.data);
      setList(response.data.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div id="QnAPage">
      <Header />
      <main className={styles.container}>
        <header>
          <h1>Q&A</h1>
          <p>
            Counting objects: 100% (28/28), done. Delta compression using up to
            8 threads Compressing objects: 100% (18/18), done. Writing objects:
            100% (18/18), 2.09 KiB
          </p>
        </header>
        {isLoading ? (
          "loading"
        ) : (
          <section className={styles.tableBox}>
            <div>
              <div id="table" className={styles.table}>
                <div id="thead" className={styles.thead}>
                  <div id="tr">
                    <div>번호</div>
                    <div>제목</div>
                    <div>날짜</div>
                    <div>작성자</div>
                  </div>
                </div>

                <InnerQnA list={currentPosts(list)} />
              </div>

              <Page
                postsPerPage={postsPerPage}
                totalPosts={
                  list.length % postsPerPage === 0
                    ? list.length / postsPerPage
                    : list.length / postsPerPage + 1
                } //list가 여러개 옴
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                className={styles.pagination}
              ></Page>
            </div>
            <div className={styles.btn}>
              <Link to="/QnA">직접 문의하기</Link>
            </div>
          </section>
        )}
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default QnA;
