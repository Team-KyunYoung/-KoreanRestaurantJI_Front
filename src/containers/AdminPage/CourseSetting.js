import DishService from "lib/api/DishService";
import CourseService from "lib/api/CourseService";
import React, { useEffect, useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const CourseSetting = () => {
  const [appetizerDishs, setAppetizerDishs] = useState({});
  const [entreeDishs, setEntreeDishs] = useState([]);
  const [dessertDishs, setDessertDishs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    DishService.findAllDish()
      .then((response) => {
        if(response.data.data.length !== 0){
          let appetizer = []
          let entree = []
          let dessert = []
          let count = 0
          response.data.data.map( dishData => {
            let dishName = dishData.dishName
            count += 1
            if(dishData.dishCategory === "전식"){
              appetizer.push(dishName)
            } else if(dishData.dishCategory === "본식"){
              entree.push(dishName)
            } else if(dishData.dishCategory === "후식"){
              dessert.push(dishName)
            }
          })
          if(response.data.data.length === count){
            setAppetizerDishs(appetizer)
            setEntreeDishs(entree)
            setDessertDishs(dessert)
            setIsLoading(false)
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setCreateCourseInput({ ...createCourseInput,
      appetizer: appetizerDishs[0],
      entree1: entreeDishs[0],
      entree2: entreeDishs[1],
      entree3: entreeDishs[2],
      dessert: dessertDishs[0]
    });
  }, []);
  function DishSelectOption({dishName}){
    return(
      <option key={dishName} value={dishName}>{dishName}</option>
    )
  }

  const [createCourseInput, setCreateCourseInput] = useState({
    courseName: "",
    coursePrice: "",
    appetizer: "",
    entree1: "",
    entree2: "",
    entree3: "",
    dessert: ""
  });
  const handleCreateCourseInput = (e)=>{
    setCreateCourseInput({
      ...createCourseInput,
      [e.target.name] : e.target.value,
    });
  }
  function createCourseBtn() {
    CourseService.createCourse(createCourseInput)
    .then(() => {
      alert("코스 정보가 등록되었습니다.")
      setCreateCourseInput({
        courseName: "",
        coursePrice: "",
        appetizer: "",
        entree1: "",
        entree2: "",
        entree3: "",
        dessert: ""
      })
    })
    .catch((error) => {
      console.log(error.response);
      alert("코스 등록에 실패하였습니다.")
    });
  }

  const [searchCourseInput, setSearchCourseInput] = useState("");
  const handleSearchCourseInput = (e)=>{  setSearchCourseInput(e.target.value);  }
  const [searchCourseList, setSearchCourseList] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true);
  function searchCourseBtn() {
    CourseService.searchCourse(searchCourseInput)
    .then((response) => {
      setSearchCourseInput("")
      setSearchCourseList(response.data.data)
      setIsSearchLoading(false)
    })
    .catch((error) => {
      setSearchCourseList([])
      setIsSearchLoading(false)
      console.log(error.response);
    });
  }
  function deleteCourseBtn(CourseNumber) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      CourseService.deleteCourse(CourseNumber)
      .then((response) => {
        alert("해당 요리 데이터가 삭제되었습니다.")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error.response);
      });
    }
  }
  function SearchOutput({courseNumber, courseName}){
    return(
      <div className={styles.searchItem}>
        <span>{courseNumber}</span>
        <span>{courseName}</span>
        <button className={styles.deleteBtn} onClick={() => deleteCourseBtn(courseNumber)}>삭제</button>
      </div>
    )
  }

  return (
    <div className="CourseSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>코스 설정 페이지</h3></div>
              <div className={styles.settingContents}>
                <div className={styles.create}>
                    <h4>코스 등록하기</h4><hr/>
                    <div className={styles.createInput}>
                      <div className={styles.courseInput}>
                        <label className={styles.inputLabel}>코스 이름 <input name="courseName" onChange={handleCreateCourseInput} value={createCourseInput.CourseName}/></label>
                        <label className={styles.inputLabel}>코스 가격 <input name="coursePrice" onChange={handleCreateCourseInput} value={createCourseInput.CoursePrice} placeholder="숫자만 입력"/></label>
                        <label className={styles.inputLabel}>전식 선택 
                          <select name="appetizer" onChange={handleCreateCourseInput} value={createCourseInput.appetizer}>
                            { isLoading ? null 
                            : appetizerDishs.length === 0 ? <option>해당 요리 없음</option>
                              : appetizerDishs.map( dishData => (
                                <DishSelectOption key={dishData}
                                  dishName={dishData}
                                />
                              ))
                            }
                          </select>
                        </label>
                        <label className={styles.inputLabel}>중식1 선택 
                          <select name="entree1" onChange={handleCreateCourseInput} value={createCourseInput.entree1}>
                            { isLoading ? null 
                            : entreeDishs.length === 0 ? <option>해당 요리 없음</option>
                              : entreeDishs.map( dishData => (
                                <DishSelectOption key={dishData}
                                  dishName={dishData}
                                />
                              ))
                            }
                          </select>
                        </label>
                        <label className={styles.inputLabel}>중식2 선택 
                          <select name="entree2" onChange={handleCreateCourseInput} value={createCourseInput.entree2}>
                            { isLoading ? null 
                            : entreeDishs.length === 0 ? <option>해당 요리 없음</option>
                              : entreeDishs.map( dishData => (
                                <DishSelectOption key={dishData}
                                  dishName={dishData}
                                />
                              ))
                            }
                          </select>
                        </label>
                        <label className={styles.inputLabel}>중식3 선택 
                          <select name="entree3" onChange={handleCreateCourseInput} value={createCourseInput.entree3}>
                            { isLoading ? null 
                            : entreeDishs.length === 0 ? <option>해당 요리 없음</option>
                              : entreeDishs.map( dishData => (
                                <DishSelectOption key={dishData}
                                  dishName={dishData}
                                />
                              ))
                            }
                          </select>
                        </label>
                        <label className={styles.inputLabel}>후식 선택 
                          <select name="dessert" onChange={handleCreateCourseInput} value={createCourseInput.dessert}>
                            { isLoading ? null 
                            : dessertDishs.length === 0 ? <option>해당 요리 없음</option>
                              : dessertDishs.map( dishData => (
                                <DishSelectOption key={dishData}
                                  dishName={dishData}
                                />
                              ))
                            }
                          </select>
                        </label>
                        <button className={styles.createBtn} onClick={createCourseBtn}>등록</button>
                      </div>
                    </div>
                </div><br/>
                <div className={styles.delete}>
                    <h4>코스 삭제하기</h4><hr/>
                    <div className={styles.deleteSearch}>
                      <div className={styles.searchInput}>
                        <label className={styles.searchLabel}>코스 이름 <input name="searchName" onChange={handleSearchCourseInput} value={searchCourseInput}/></label>
                        <button className={styles.searchBtn} onClick={searchCourseBtn}>검색</button>
                      </div><br/>
                      <div className={styles.searchList}>
                        { isSearchLoading ? null :
                          searchCourseList.length == 0 ? <div className={styles.searchNone}>검색어가 포함된 코스가 없습니다.</div>
                          : searchCourseList.map( searchData => (
                            <SearchOutput key={searchData.courseNumber}
                              courseNumber={searchData.courseNumber}
                              courseName={searchData.courseName}
                            />
                          ))
                        }
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CourseSetting;
