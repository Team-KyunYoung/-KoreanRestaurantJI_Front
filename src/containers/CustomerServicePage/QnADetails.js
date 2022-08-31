import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import Page from "../../components/Pagination/Pagination";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
const QnADetails = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editStatus, setEditStatus] = useState(true); //기본값 수정x상태
  const param = useParams();
  const navigate = useNavigate();
  console.log(param.number);
  useEffect(() => {
    if (param.isPrivate === "true") {
      //false가 boolean이 아니라 string으로 인식됨
      Question.findPrivateQnAAnswer(Number(param.number))
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          alert("작성자만 조회할 수 있습니다.");
          navigate("/QnA");
        });
    } else {
      Question.findPublicQnAAnswer(Number(param.number))
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          setIsLoading(false);
        })
        .catch(() => {});
    }
  }, []);
  const editMode = () => {
    setEditStatus(false);
  };
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
          <section className={styles.singleQuestionBox}>
            <div>
              <form>
                <input
                  type="text"
                  id="QnAtitle"
                  name="QnAtitle"
                  placeholder={data.questionTitle}
                  disabled={editStatus}
                />
                <span>{data.writer}</span>
                <span>{data.writeDate}</span>
                <span>
                  {data.private === "true" ? (
                    <>
                      <label for="private">공개</label>
                      <input
                        type="checkbox"
                        id="private"
                        checked
                        disabled={editStatus}
                      />
                    </>
                  ) : (
                    <>
                      <label for="private">공개</label>
                      <input
                        type="checkbox"
                        id="private"
                        disabled={editStatus}
                      />
                    </>
                  )}
                </span>
                <textarea
                  placeholder={data.questionContents}
                  disabled={editStatus}
                ></textarea>
              </form>
            </div>
            <div className={styles.btn}>
              <button onClick={editMode}>수정하기</button>
            </div>
          </section>
        )}
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default QnADetails;
