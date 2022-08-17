import React from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import ChatShortcut from "../../components/ShortCut/ChatShortcut";
import styles from "./Course.module.scss";
import * as Authentication from "lib/api/Authentication";
// 백에서 보내주는 형태에 맞춰 변경 예정, 초안
// function CourseInnerPage(props) {
//   const list = [];
//   for (let i = 0; i < props.topics.length; i++) {
//     let t = props.topics[i];
//     list.push(
//       <li key={t.id}>
//         <a
//           id={t.id}
//           href={"/read/" + t.id}
//           onClick={(event) => {
//             event.preventDefault();
//             props.onChangeMode(event.target.id); //onChangeMode에서 필요한 id값 넘겨주기
//             //even.tartet은 이벤트를 유발시킨 태그를 의미함->a태그의 id 우선적으로 설정해야 함
//           }}
//         >
//           {t.title}
//         </a>
//       </li>
//     );
//     //list 생성 시 key 지정 필수
//   }
//   return (
//     <div>
//         <h1>Lorem Ipsum</h1>
//       {list}
//     </div>
//   );
// }
function CourseInnerPage(props) {
  return (
    <div>
      <h3>Lorem Ipsum</h3>
      <hr />
      <ul>
        <Link to="../Dish#appetizer">
          <li>Lorem</li>
        </Link>
        <li>ipsum</li>
        <li>is</li>
        <li>simply</li>
        <li>dummy text</li>
      </ul>
    </div>
  );
}
const Course = () => {
  return (
    <div id="CoursePage">
      <Header />
      <main className={styles.container}>
        <section id="page1" className={[styles.page, styles.page1].join(" ")}>
          <CourseInnerPage json="json" />
        </section>
        <section id="page2" className={[styles.page, styles.page2].join(" ")}>
          <CourseInnerPage />
        </section>
        <section id="page3" className={[styles.page, styles.page3].join(" ")}>
          <CourseInnerPage />
        </section>
      </main>
      <nav className={styles.dotForNav}>
        <a href="#page1">1</a>
        <a href="#page2">2</a>
        <a href="#page3">3</a>
      </nav>
      <ChatShortcut />
      <Footer />
    </div>
  );
};

export default Course;
