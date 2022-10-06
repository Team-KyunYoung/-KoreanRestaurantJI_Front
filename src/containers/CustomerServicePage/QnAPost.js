import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ListShortcut from "components/ShortCut/ListShortcut";
import Comment from "./QnAComment";
import styles from "./CS.module.scss";
import uniqueStyles from "./CreateQnA.module.scss";
import UserService from "lib/api/UserService";
import Question from "lib/api/Question";
import AdminComment from "lib/api/AdminComment";

const QnADetails = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [role, setRole] = useState("none"); //조회자의 역할 : admin,writer,non
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
                setRole("writer");
              }
            })
            .catch((error) => {
              console.log(error);
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
                setRole("writer");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    AdminComment.findComment(Number(param.number))
      .then((response) => {
        setCommentList(response.data.data);
        console.log(response.data.data);
        setCommentLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    UserService.isAdmin()
      .then((response) => {
        console.log(response);
        if (response.data.data === true) {
          setRole("admin");
          console.log("admin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const requestEdit = (e) => {
    //수정하기 버튼 : input의 disabled 해제
    if (role === "writer") {
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
        window.location.replace(
          "/QnABoard/" + Number(param.number) + "/" + param.isPrivate
        );
      })
      .catch((error) => {
        console.log(error);
        alert("입력 내용을 확인해주세요");
      });
  };
  //관리자 답글
  const [comment, setComment] = useState("");
  const adminHandleChange = useCallback((e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  }, []);
  const adminHandleClick = (e) => {
    AdminComment.createComment(Number(param.number), comment)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteQnAPost = () => {
    Question.deleteQnA(Number(param.number))
      .then((response) => {
        window.location.replace("/QnABoard");
      })
      .catch((error) => {
        console.log(error);
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
          <>
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
                          placeholder={data.questionTitle}
                          disabled={editDisabled}
                          onChange={writerHandleChange}
                          name="title"
                          maxLength={100}
                        />{" "}
                        <p
                          className={styles.counter}
                          style={{ display: counterDisplay }}
                        >
                          ({title.length}/100)
                        </p>
                      </div>
                      <div className={styles.checkBox}>
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
                    <div className={styles.inputBox}>
                      <label
                        htmlFor="contents"
                        className={styles.textareaLabel}
                      >
                        내용
                      </label>
                      <textarea
                        placeholder={data.questionContents}
                        disabled={editDisabled}
                        onChange={writerHandleChange}
                        value={contents}
                        name="contents"
                        maxLength={500}
                      ></textarea>{" "}
                      <p
                        className={styles.counter}
                        style={{ display: counterDisplay }}
                      >
                        ({contents.length}/500)
                      </p>
                    </div>
                    <div className={styles.btn}>
                      {role === "writer" ? ( //글쓴이가 아니라면 수정하기 버튼 자체를 숨김
                        <>
                          {editDisabled ? ( //수정하기 버튼 클릭
                            <>
                              <button type="button" onClick={requestEdit}>
                                수정하기
                              </button>

                              <button type="button" onClick={deleteQnAPost}>
                                삭제하기
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={WriterHandleSubmit}
                              >
                                저장하기
                              </button>
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
                  </div>
                </form>
              </div>
            </section>

            <section className={styles.commentBox}>
              <div>
                {role === "admin" ? (
                  <>
                    <p>댓글달기</p>
                    <form onSubmit={adminHandleClick}>
                      <textarea
                        type="text"
                        id="comment"
                        onChange={adminHandleChange}
                        name="comment"
                        maxLength={255}
                      />
                      <button type="submit">제출</button>
                    </form>
                  </>
                ) : (
                  ""
                )}
                {commentLoading ? (
                  "loading"
                ) : (
                  <>
                    <Comment
                      list={commentList}
                      qnaNum={param.number}
                      isPrivate={param.isPrivate}
                      isAdmin={role === "admin"}
                    />
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <ListShortcut link="QnABoard" />
      <Footer />
    </div>
  );
};

export default QnADetails;
