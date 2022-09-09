import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ListShortcut from "../../components/ShortCut/ListShortcut";
import styles from "./CS.module.scss";
import UserService from "lib/api/UserService";
import Question from "lib/api/Question";
import AdminComment from "lib/api/AdminComment";

const QnADetails = () => {
  function Comment(props) {
    const commentlist = [];
    if (!props.load) {
      console.log(props.list);
      props.list.map((obj) => {
        commentlist.push(
          <input
            key={obj.commentNumber}
            placeholder={obj.commentContents}
            onChange={commentOnChange}
            onClick={onClickComment}
          />
        );
      });
    }
    return <>{commentlist}</>;
  }
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [isWriter, setIsWriter] = useState(false); //조회자가 글쓴이 본인인지 확인 t->버튼 보임 f->버튼 숨김
  const [editDisabled, setEditDisabled] = useState(true); //input disabled 상태,수정하기 버튼 클릭 시 버튼 바뀌며 input이 입력가능해짐
  const [counterDisplay, setCounterDisplay] = useState("none"); //글자 수 카운터의 display style, 버튼 클릭 시 none->block
  const [commentList, setCommentList] = useState({});
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
    UserService.findUser()
      .then((res) => {
        if (param.isPrivate === "true") {
          console.log("private");
          //false가 boolean이 아니라 string으로 인식됨
          Question.findPrivateQnAAnswer(Number(param.number))
            .then((response) => {
              console.log(response.data.data);
              setData(response.data.data);
              setIsLoading(false);
              if (res.data.data.userNickname === response.data.data.writer) {
                setIsWriter(true);
              }
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
              if (res.data.data.userNickname === response.data.data.writer) {
                setIsWriter(true);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    AdminComment.findComment(Number(param.number)).then((response) => {
      setCommentList(response.data.data);
      console.log(response.data.data);
      setCommentLoading(false);
    });
  }, []);
  const requestEdit = (e) => {
    //수정하기 버튼 : input의 disabled 해제
    if (isWriter) {
      setEditDisabled(false);
      setCounterDisplay("block");
      setForm({
        title: data.questionTitle,
        privatePost: data.private,
        contents: data.questionContents,
      });
    } else {
      alert("작성자 본인만 수정할 수 있습니다.");
    }
  };
  const refuseEdit = (e) => {
    //수정 취소 버튼 클릭 시
    setEditDisabled(true);
    setForm({
      title: data.questionTitle,
      privatePost: data.private,
      contents: data.questionContents,
    });
  };
  //qna 포스팅 수정
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
    Question.updateQnA(Number(param.number), privatePost, contents, title)
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch(() => {
        alert("입력 내용을 확인해주세요");
      });
  };
  //관리자 답글
  const [comment, setComment] = useState("");
  const adminHandleChange = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };
  const adminHandleClick = (e) => {
    AdminComment.createComment(Number(param.number), comment)
      .then((response) => {
        console.log(response);
      })
      .catch(() => {});
  };
  const commentOnChange = (e) => {
    console.log(e.target.key);
    AdminComment.updateComment(Number(param.number), comment)
      .then((response) => {
        console.log(response);
      })
      .catch(() => {});
  };
  const onClickComment = (e) => {
    console.log(e.target.key);
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
          <>
            <section className={styles.singleQuestionBox}>
              <div>
                <form onSubmit={WriterHandleSubmit}>
                  <div className={styles.firstLine}>
                    <div
                      className={[styles.formBox, styles.inputBox].join(" ")}
                    >
                      <label htmlFor="title">제목</label>{" "}
                      <input
                        type="text"
                        id="title"
                        value={title}
                        placeholder={data.questionTitle}
                        disabled={editDisabled}
                        onChange={writerHandleChange}
                        name="title"
                        maxLength={100}
                      />{" "}
                    </div>
                    <p
                      className={styles.titleCounter}
                      style={{ display: counterDisplay }}
                    >
                      ({title.length}/100)
                    </p>
                    <div
                      className={[styles.formBox, styles.checkBox].join(" ")}
                    >
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
                          disabled={editDisabled}
                          onChange={writerHandleChange}
                        />{" "}
                        <label htmlFor="private">비공개</label>{" "}
                        <input
                          type="radio"
                          id="private"
                          value={true}
                          name="privatePost"
                          defaultChecked={data.private ? true : false}
                          disabled={editDisabled}
                          onChange={writerHandleChange}
                        />
                      </span>
                    </div>
                  </div>
                  <div className={styles.formBox}>
                    <span className={styles.textareaLabel}>내용</span>{" "}
                    <textarea
                      placeholder={data.questionContents}
                      disabled={editDisabled}
                      onChange={writerHandleChange}
                      value={contents}
                      name="contents"
                      maxLength={500}
                    ></textarea>{" "}
                    <p
                      className={styles.contentCounter}
                      style={{ display: counterDisplay }}
                    >
                      ({contents.length}/500)
                    </p>
                  </div>
                  <div className={styles.btn}>
                    {isWriter ? ( //글쓴이가 아니라면 수정하기 버튼 자체를 숨김
                      <>
                        {editDisabled ? ( //수정하기 버튼 클릭
                          <button type="button" onClick={requestEdit}>
                            수정하기
                          </button>
                        ) : (
                          <>
                            <button type="submit">저장하기</button>
                            <button
                              name="reset"
                              type="reset"
                              value="Reset"
                              onClick={refuseEdit}
                            >
                              취소하기
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              </div>
            </section>
          </>
        )}
        <section className={styles.singleQuestionBox}>
          <form onSubmit={adminHandleClick}>
            <input
              type="text"
              id="title"
              // placeholder={data.questionTitle}
              // disabled={editDisabled}
              onChange={adminHandleChange}
              name="title"
              maxLength={200}
            />
            <button type="submit">submit</button>
          </form>
          <>
            <Comment list={commentList} load={commentLoading} />
          </>
          {/* <p style={{ display: counterDisplay }}>({title.length}/200)</p> */}
        </section>
      </main>

      <ListShortcut />
      <Footer />
    </div>
  );
};

export default QnADetails;
