import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";
import UserService from "lib/api/UserService";
const Questioning = () => {
  const navigate = useNavigate();
  //json으로 보낼 내용
  const [form, setForm] = useState({
    title: "",
    privatePost: "",
    contents: "",
  });
  const { title, privatePost, contents } = form;

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
    console.log(privatePost !== null);
    console.log(contents !== null);
    Question.createQnA(privatePost, contents, title)
      .then((response) => {
        console.log(response);
        navigate("/QnABoard");
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
        <section className={styles.singleQuestionBox}>
          <div>
            <form>
              <div className={styles.firstLine}>
                <div className={[styles.formBox, styles.inputBox].join(" ")}>
                  <label htmlFor="title">제목</label>{" "}
                  <input
                    type="text"
                    id="title"
                    value={title}
                    placeholder="제목을 입력해주세요"
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
                      onChange={handleChange}
                    />{" "}
                    <label htmlFor="private">비공개</label>{" "}
                    <input
                      type="radio"
                      id="private"
                      value={true}
                      name="privatePost"
                      onChange={handleChange}
                    />
                  </span>
                </div>
              </div>
              <div className={styles.formBox}>
                <span className={styles.textareaLabel}>내용</span>{" "}
                <textarea
                  placeholder="내용을 입력해주세요"
                  onChange={handleChange}
                  value={contents}
                  name="contents"
                ></textarea>
              </div>
              <div className={styles.btn}>
                {" "}
                <button type="button" onClick={handleSubmit}>
                  바꾸기
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default Questioning;
