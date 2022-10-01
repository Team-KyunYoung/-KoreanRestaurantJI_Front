import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ListShortcut from "components/ShortCut/ListShortcut";
import styles from "./CS.module.scss";
import Question from "lib/api/Question";

const CreateFAQ = () => {
  const [data, setData] = useState({
    title: "",
    contents: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();

  const [form, setForm] = useState({
    title: "",
    contents: "",
  });
  const { title, contents } = form;
  useEffect(() => {
    console.log(param.mode);
    if (param.mode === "create") setIsLoading(false);
    else {
      Question.findPublicQnAAnswer(Number(param.number))
        .then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
          setIsLoading(false);
          setForm({
            title: response.data.data.questionTitle,
            contents: response.data.data.questionContents,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const refuseEdit = (e) => {
    navigate("/FAQBoard");
  };
  const writerHandleChange = (e) => {
    const nextForm = {
      ...form, // 기존의 값 복사 (spread operator)
      [e.target.name]: e.target.value, // 덮어쓰기
    };
    console.log(nextForm);
    setForm(nextForm);
  };
  const WriterHandleSubmit = (e) => {
    //저장하기 버튼 : input 제출
    if (param.mode === "create") {
      console.log("생성");
      Question.createFaq(contents, title)
        .then((response) => {
          console.log(response);
          window.location.replace("/FAQBoard");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Question.updateFaq(Number(param.number), contents, title)
        .then((response) => {
          console.log(response);
          window.location.replace("/FAQBoard/update/" + Number(param.number));
        })
        .catch((error) => {
          console.log(error);
          alert("입력 내용을 확인해주세요");
        });
    }
  };
  return (
    <div id="FAQPostPage">
      <Header />
      <main className={styles.container}>
        <header>
          <h1>Event</h1>
          <p>
            Counting objects: 100% (28/28), done. Delta compression using up to
            8 threads Compressing objects: 100% (18/18), done. Writing objects:
            100% (18/18), 2.09 KiB
          </p>
        </header>
        {isLoading ? (
          "loading"
        ) : (
          <>
            {" "}
            <section className={styles.singleQuestionBox}>
              <div>
                <form>
                  <div className={styles.formBox}>
                    <div
                      className={[styles.inputBox, styles.faqInput].join(" ")}
                    >
                      <label htmlFor="title">제목</label>{" "}
                      <input
                        type="text"
                        id="title"
                        value={title}
                        placeholder={data.questionTitle}
                        onChange={writerHandleChange}
                        name="title"
                        maxLength={100}
                      />{" "}
                      <p className={styles.counter}>({title.length}/100)</p>
                    </div>
                    <div className={styles.inputBox}>
                      <label
                        htmlFor="contents"
                        className={styles.textareaLabel}
                      >
                        내용
                      </label>
                      <textarea
                        placeholder={data.questionContents}
                        value={contents}
                        onChange={writerHandleChange}
                        name="contents"
                        maxLength={500}
                      ></textarea>{" "}
                      <p className={styles.counter}>({contents.length}/500)</p>
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <button type="button" onClick={WriterHandleSubmit}>
                      게시하기
                    </button>
                    <button
                      name="reset"
                      type="reset"
                      value="Reset"
                      onClick={refuseEdit}
                    >
                      취소하기
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
      </main>
      <ListShortcut link="FAQBoard" />
      <Footer />
    </div>
  );
};

export default CreateFAQ;
