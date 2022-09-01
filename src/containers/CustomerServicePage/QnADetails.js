import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
import UserService from "lib/api/UserService";
const QnADetails = () => {
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [editStatus, setEditStatus] = useState(true); //기본값 수정x상태
  const [editMode, setEditMode] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  console.log(param.number);
  useEffect(() => {
    if (param.isPrivate === "true") {
      console.log("private");
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
  const requestEdit = (e) => {
    console.log(e.target);

    UserService.findUser().then((response) => {
      console.log(response.data.data);
      setUser(response.data.data);
      if (response.data.data.userNickname === data.writer) {
        setEditMode(true);
        setEditStatus(false);
      } else {
        alert("작성자 본인만 수정할 수 있습니다.");

        setEditMode(false);
      }
    });
  };

  const submitEditQnA = () => {
    alert("d");
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
                        disabled={editStatus}
                      />
                    </>
                  ) : (
                    <>
                      <label for="private">공개</label>
                      <input
                        type="checkbox"
                        id="private"
                        checked
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
              {editMode ? (
                <button type="submit" onClick={submitEditQnA}>
                  바꾸기
                </button>
              ) : (
                <button type="button" onClick={requestEdit}>
                  수정하기
                </button>
              )}
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
