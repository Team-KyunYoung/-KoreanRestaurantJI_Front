import React, { useState, useCallback } from "react";
import styles from "./CS.module.scss";
import AdminComment from "lib/api/AdminComment";

const QnaComment = (props) => {
  const [comment, setComment] = useState("");
  const adminHandleChange = useCallback((e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  }, []);
  const updateComment = (e) => {
    console.log(e.target.id, comment);
    AdminComment.updateComment(e.target.id, comment)
      .then((response) => {
        console.log(response);
        window.location.replace(
          "/QnABoard/" + props.qnaNum + "/" + props.isPrivate
        );
      })
      .catch(() => {});
  };
  const deleteComment = (e) => {
    AdminComment.deleteComment(e.target.id)
      .then((response) => {
        console.log(response);
        window.location.replace(
          "/QnABoard/" + props.qnaNum + "/" + props.isPrivate
        );
      })
      .catch(() => {});
  };
  const commentlist = [];
  console.log(props.list);
  props.list.map((obj, i) => {
    commentlist.push(
      <li key={i}>
        <textarea
          placeholder={obj.commentContents}
          onChange={adminHandleChange}
          type="text"
          id="updateComment"
          name={obj.commentNumber}
          maxLength={255}
          disabled={!props.isAdmin} //관리자 아니면 읽기만 가능
        />
        {props.isAdmin ? (
          <>
            {" "}
            <button
              type="submit"
              className={styles.sideBySide}
              id={obj.commentNumber}
              key={obj.commentNumber}
              onClick={updateComment}
            >
              수정
            </button>
            <button
              className={styles.sideBySide}
              type="submit"
              id={obj.commentNumber}
              onClick={deleteComment}
            >
              삭제
            </button>
          </>
        ) : (
          ""
        )}
      </li>
    );
  });
  return (
    <>
      <p>답변</p>
      <ul>{commentlist}</ul>
    </>
  );
};

export default QnaComment;
