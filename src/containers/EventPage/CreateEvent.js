import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import Chat from "../../components/ChatBot/Chat";
import ImgBanner from "../../components/Banner/ImgBanner";
import styles from "./Event.module.scss";
import EventService from "lib/api/EventService";

const image1 = "https://picsum.photos/800/600";
const CreateEvent = () => {
  const [data, setData] = useState({
    title: "",
    imgUrl: "",
    contents: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const param = useParams();

  const [form, setForm] = useState({
    title: "",
    imgUrl: "",
    contents: "",
  });
  const { title, imgUrl, contents } = form;
  useEffect(() => {
    if (param.mode === "Create") setIsLoading(false);
    else {
      EventService.findEvent(Number(param.number))
        .then((response) => {
          setData(response.data.data);
          setIsLoading(false);
          setForm({
            title: response.data.data.eventTitle,
            imgUrl: response.data.data.eventImage,
            contents: response.data.data.eventContents,
          });
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const refuseEdit = (e) => {
    navigate("/Event");
  };
  const writerHandleChange = (e) => {
    const nextForm = {
      ...form, // 기존의 값 복사 (spread operator)
      [e.target.name]: e.target.value, // 덮어쓰기
    };
    setForm(nextForm);
  };
  const WriterHandleSubmit = (e) => {
    //저장하기 버튼 : input 제출
    if (param.mode === "Create") {
      EventService.createEvent(contents, imgUrl, title)
        .then(() => {
          window.location.replace("/Event");
        })
        .catch(() => {});
    } else {
      EventService.updateEvent(Number(param.number), contents, imgUrl, title)
        .then(() => {
          window.location.replace("/Event/Post/" + Number(param.number));
        })
        .catch(() => {
          alert("입력 내용을 확인해주세요");
        });
    }
  };
  return (
    <div id="EventCreatePage">
      <Header />
      <main className={styles.container}>
        {isLoading ? (
            <ImgBanner
              img={image1}
              pageTitle="Event"
              pageDetails="智가 현재 진행하고 있는 이벤트입니다."
            />
          ) : (
            <ImgBanner
              img={imgUrl}
              pageTitle="Event"
              pageDetails="智가 현재 진행하고 있는 이벤트입니다."
            />
          )}
        <section className={styles.eventBox}>
          {isLoading ? (
            "loading"
          ) : (
            <div>
              <h3>이벤트 글쓰기</h3>
              <form>
                <div className={styles.formBox}>
                  <div className={[styles.inputBox, styles.faqInput].join(" ")}>
                    <label htmlFor="title" className={styles.titleLabel}>
                      제목
                    </label>{" "}
                    <input
                      type="text"
                      id="title"
                      value={title}
                      placeholder={data.eventTitle}
                      onChange={writerHandleChange}
                      name="title"
                      maxLength={100}
                    />{" "}
                  </div>
                  <p className={styles.counter}>({title.length}/100)</p>
                  <div className={[styles.inputBox, styles.faqInput].join(" ")}>
                    <label htmlFor="title" className={styles.imgLabel}>
                      imgUrl
                    </label>{" "}
                    <input
                      type="text"
                      id="imgUrl"
                      value={imgUrl}
                      placeholder={data.eventImage}
                      onChange={writerHandleChange}
                      name="imgUrl"
                      maxLength={253}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label htmlFor="contents" className={styles.textareaLabel}>
                      내용
                    </label>
                    <textarea
                      placeholder={data.eventContents}
                      value={contents}
                      onChange={writerHandleChange}
                      name="contents"
                      maxLength={500}
                    ></textarea>{" "}
                  </div>
                  <p className={styles.counter}>({contents.length}/500)</p>
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
          )}
        </section>
      </main>
      <Chat />
      <Footer />
    </div>
  );
};

export default CreateEvent;
