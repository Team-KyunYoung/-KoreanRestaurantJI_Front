import React, { useState, useEffect } from "react";
import styles from "./UserInfo.module.scss";
import Pagination from "react-bootstrap/Pagination";

const Page = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
  const pageNum = 5; //보여지는 페이지 개수

  const [showingNum, setShowingNum] = useState({
    start: 1,
    end: pageNum,
  });

  useEffect(() => {
    setCurrentPage(showingNum.start);
  }, [showingNum, setCurrentPage]);
  const changePageLowerNumber = () => {
    currentPage > pageNum && //현재 페이지가 5보다 클 때 실행
      setShowingNum((prev) => arrowHandler(prev, -1, totalPosts));
  };
  const changePageUpperNumbers = () => {
    showingNum.end <= totalPosts &&
      setShowingNum((prev) => arrowHandler(prev, 1, totalPosts));
  };

  useEffect(() => {
    totalPosts <= pageNum //전체 포스트 수가 5보다 작으면
      ? setShowingNum((prev) => ({ ...prev, start: 1, end: totalPosts })) //end를 전체 페이지 개수(5이하)로 설정
      : setShowingNum((prev) => ({ ...prev, start: 1, end: pageNum })); //end를 5로 설정
  }, [totalPosts]);

  const arrowHandler = (prev, sign, totalPosts) => {
    const nextIndex = prev.end + pageNum;
    let res; //arrow 클릭 후 바뀌게 될 페이지 번호 나열(ex < 5 6 7 8 9 10 >)에서 마지막 페이지의 번호(ex 10)
    if (sign === 1) {
      //>화살표 클릭 시
      res = nextIndex > totalPosts ? totalPosts : nextIndex; //nextIndex가 전체보다 크면 마지막 페이지 번호는 전체 post개수
    } else if (sign === -1) {
      //< 화살표 클릭,
      res =
        prev.end - prev.start < 4
          ? prev.start + 4 - pageNum //< 6 7 8 > 일 떄 -> 5
          : prev.end - pageNum; //< 6 7 8 9 10 > 일 때  -> 5
    }
    return { ...prev, start: prev.start + pageNum * sign, end: res };
  };
  const isFirstPage = showingNum.start === 1;
  const isLastPage = showingNum.end === totalPosts;
  const pageNumbers = [];
  for (let i = showingNum.start; i <= showingNum.end; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <Pagination className={styles.pagination}>
        <Pagination.Item onClick={changePageLowerNumber} disabled={isFirstPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        </Pagination.Item>
        {pageNumbers.map((number) => (
          <Pagination.Item
            page={number}
            onClick={() => setCurrentPage(number)}
            active={number === currentPage}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Item onClick={changePageUpperNumbers} disabled={isLastPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </Pagination.Item>
      </Pagination>
    </>
  );
};

export default Page;
