import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "components/header/Header";
import Chat from "../../components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import styles from "./Course.module.scss";
import CourseService from "lib/api/CourseService";

function CourseInnerPage(data) {
  return (
    <div>
      <h3>Course {data.data.courseName}</h3>
      <i>{data.data.coursePrice.toLocaleString("ko-KR")}원</i>
      <hr />
      <ul>
        <h5>Appetizer</h5>
        <li>
          <Link
            to={
              "/Dish/" +
              data.data.appetizer.dishNumber +
              "/" +
              data.data.appetizer.dishName
            }
          >
            {data.data.appetizer.dishName}
          </Link>
        </li>
        <br />
        <h5>Entree</h5>
        <li>
          <Link
            to={
              "/Dish/" +
              data.data.entree1.dishNumber +
              "/" +
              data.data.entree1.dishName
            }
          >
            {data.data.entree1.dishName}
          </Link>
        </li>
        <li>
          <Link
            to={
              "/Dish/" +
              data.data.entree2.dishNumber +
              "/" +
              data.data.entree2.dishName
            }
          >
            {data.data.entree2.dishName}
          </Link>
        </li>
        <li>
          <Link
            to={
              "/Dish/" +
              data.data.entree3.dishNumber +
              "/" +
              data.data.entree3.dishName
            }
          >
            {data.data.entree3.dishName}
          </Link>
        </li>
        <br />
        <h5>Dessert</h5>
        <li>
          <Link
            to={
              "/Dish/" +
              data.data.dessert.dishNumber +
              "/" +
              data.data.dessert.dishName
            }
          >
            {data.data.dessert.dishName}
          </Link>
        </li>
      </ul>
    </div>
  );
}
const Course = () => {
  const [course1, setCourse1] = useState([]);
  const [course2, setCourse2] = useState([]);
  const [course3, setCourse3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CourseService.findAllCourse()
      .then((response) => {
        if (response.data.data.length >= 3) {
          setCourse1(response.data.data[0]);
          setCourse2(response.data.data[1]);
          setCourse3(response.data.data[2]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="CoursePage">
      <Header />
      <main className={styles.container}>
        <section id="page1" className={[styles.page, styles.page1].join(" ")}>
          {isLoading ? (
            "Loading..."
          ) : (
            <CourseInnerPage key={course1.courseName} data={course1} />
          )}
        </section>
        <section id="page2" className={[styles.page, styles.page2].join(" ")}>
          {isLoading ? (
            "Loading..."
          ) : (
            <CourseInnerPage key={course2.courseName} data={course2} />
          )}
        </section>
        <section id="page3" className={[styles.page, styles.page3].join(" ")}>
          {isLoading ? (
            "Loading..."
          ) : (
            <CourseInnerPage key={course3.courseName} data={course3} />
          )}
        </section>
      </main>
      <nav className={styles.dotForNav}>
        <a href="#page1">1</a>
        <a href="#page2">2</a>
        <a href="#page3">3</a>
      </nav>
      <Chat />
      <Footer />
    </div>
  );
};

export default Course;
