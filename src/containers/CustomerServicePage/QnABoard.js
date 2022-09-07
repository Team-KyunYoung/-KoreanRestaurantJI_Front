import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
import Page from "../../components/Pagination/Pagination";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
function InnerQnA(props) {
  console.log(props.list.length);
  const questionList = [];
  props.list.map((obj) =>
    questionList.push(
      <Link to={"./" + obj.questionNumber + "/" + obj.private}>
        <div id="tr">
          <div>{obj.questionNumber}</div>
          <div>{obj.questionTitle}</div>
          <div>{obj.writeDate}</div>
          <div>
            {obj.writer}{" "}
            {obj.private ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 6a1 1 0 0 1 2 0v1H7V6zM6 8.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3z" />
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z" />
                </svg>
              </span>
            ) : (
              ""
            )}
          </div>
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
const QnABoard = () => {
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
              <Link to="/Question">직접 문의하기</Link>
            </div>
          </section>
        )}
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default QnABoard;
