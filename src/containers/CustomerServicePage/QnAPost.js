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

  //json으로 보낼 내용
  const [form, setForm] = useState({
    title: "",
    privatePost: "",
    contents: "",
  });
  const { title, privatePost, contents } = form;

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
          navigate("/QnABoard");
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
    //수정하기 버튼 : input의 disabled 해제
    console.log(e.target);

    UserService.findUser().then((response) => {
      console.log(response.data.data);
      setUser(response.data.data);
      if (response.data.data.userNickname === data.writer) {
        setEditMode(true);
        setEditStatus(false);
        setForm({
          title: data.questionTitle,
          privatePost: data.private,
          contents: data.questionContents,
        });
      } else {
        alert("작성자 본인만 수정할 수 있습니다.");

        setEditMode(false);
      }
    });
  };

  const handleChange = (e) => {
    const nextForm = {
      ...form, // 기존의 값 복사 (spread operator)
      [e.target.name]: e.target.value, // 덮어쓰기
    };
    console.log(nextForm);
    setForm(nextForm);
  };
  const handleSubmit = (e) => {
    //바꾸기 버튼 : input 제출
    Question.updateQnA(Number(param.number), privatePost, contents, title)
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch(() => {
        alert("입력 내용을 확인해주세요");
      });
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
              <form onSubmit={handleSubmit}>
                <div className={styles.firstLine}>
                  <div className={[styles.formBox, styles.inputBox].join(" ")}>
                    <label htmlFor="title">제목</label>{" "}
                    <input
                      type="text"
                      id="title"
                      value={title}
                      placeholder={data.questionTitle}
                      disabled={editStatus}
                      onChange={handleChange}
                      name="title"
                    />
                  </div>
                  <div className={[styles.formBox, styles.checkBox].join(" ")}>
                    {/* <span>작성자 {data.writer}</span>
                  <span>날짜 {data.writeDate}</span>*/}
                    <span>
                      <label htmlFor="public">공개</label>
                      {"  "}
                      <input
                        type="radio"
                        id="public"
                        value={false}
                        name="privatePost"
                        defaultChecked={data.private ? false : true}
                        disabled={editStatus}
                        onChange={handleChange}
                      />{" "}
                      <label htmlFor="private">비공개</label>{" "}
                      <input
                        type="radio"
                        id="private"
                        value={true}
                        name="privatePost"
                        defaultChecked={data.private ? true : false}
                        disabled={editStatus}
                        onChange={handleChange}
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.formBox}>
                  <span className={styles.textareaLabel}>내용</span>{" "}
                  <textarea
                    placeholder={data.questionContents}
                    disabled={editStatus}
                    onChange={handleChange}
                    value={contents}
                    name="contents"
                  ></textarea>
                </div>
                <div className={styles.btn}>
                  {editMode ? (
                    <button type="submit">바꾸기</button>
                  ) : (
                    <button type="button" onClick={requestEdit}>
                      수정하기
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default QnADetails;
