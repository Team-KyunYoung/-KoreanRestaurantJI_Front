import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ListShortcut from "../../components/ShortCut/ListShortcut";
import styles from "./CS.module.scss";
import uniqueStyles from "./CreateQnA.module.scss";
import Question from "lib/api/Question";
const CreateQnA = () => {
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
      .catch((error) => {
        console.log(error);
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
              <div className={styles.formBox}>
                <div className={uniqueStyles.firstLine}>
                  <div className={styles.inputBox}>
                    <label htmlFor="title">제목</label>{" "}
                    <input
                      type="text"
                      id="title"
                      value={title}
                      placeholder="제목을 입력해주세요"
                      onChange={handleChange}
                      name="title"
                      maxLength={100}
                    />
                    <p className={styles.counter}>({title.length}/100)</p>
                  </div>
                  <div className={styles.checkBox}>
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
                <div className={styles.inputBox}>
                  <label htmlFor="contents" className={styles.textareaLabel}>
                    내용
                  </label>
                  <textarea
                    placeholder="내용을 입력해주세요"
                    onChange={handleChange}
                    value={contents}
                    name="contents"
                    maxLength={500}
                  ></textarea>
                  <p className={styles.counter}>({contents.length}/500)</p>
                </div>
                <div className={styles.btn}>
                  <button type="button" onClick={handleSubmit}>
                    질문하기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <ListShortcut link="QnABoard" />
      <Footer />
    </div>
  );
};

export default CreateQnA;