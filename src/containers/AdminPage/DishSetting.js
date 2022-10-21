import DishService from "lib/api/DishService";
import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const DishSetting = () => {
  const [createDishInput, setCreateDishInput] = useState({
    dishName: "",
    dishPhoto: "",
    dishPrice: "",
    dishCategory: "전식",
    dishDescription: "",
    dishCalroies: "",
    dishCarbohydrate: "",
    dishCholesterol: "",
    dishFat: "",
    dishProtein: "",
    dishServingSize: "",
    dishSodium: "",
    dishSugars: "",
    dishTransFat: "",
  });
  const handleCreateDishInput = (e) => {
    setCreateDishInput({
      ...createDishInput,
      [e.target.name]: e.target.value,
    });
  };
  function createDishBtn() {
    DishService.createDish(createDishInput)
      .then(() => {
        alert("요리 정보가 등록되었습니다.");
        setCreateDishInput({
          dishName: "",
          dishPhoto: "",
          dishPrice: "",
          dishCategory: "전식",
          dishDescription: "",
          dishCalroies: "",
          dishCarbohydrate: "",
          dishCholesterol: "",
          dishFat: "",
          dishProtein: "",
          dishServingSize: "",
          dishSodium: "",
          dishSugars: "",
          dishTransFat: "",
        });
      })
      .catch((error) => {
        console.log(error.response);
        alert("요리 등록에 실패하였습니다.");
      });
  }

  const [searchDishInput, setSearchDishInput] = useState("");
  const handleSearchDishInput = (e) => {
    setSearchDishInput(e.target.value);
  };
  const [searchDishList, setSearchDishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function searchDishBtn() {
    setSearchDishList([]);
    DishService.searchDish(searchDishInput)
      .then((response) => {
        setSearchDishInput("");
        setSearchDishList(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response);
      });
  }
  function deleteDishBtn(dishNumber) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      DishService.deleteDish(dishNumber)
        .then((response) => {
          alert("해당 요리 데이터가 삭제되었습니다.");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }
  function SearchOutput({ dishNumber, dishName }) {
    return (
      <div className={styles.searchItem}>
        <span>{dishNumber}</span>
        <span>{dishName}</span>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteDishBtn(dishNumber)}
        >
          삭제
        </button>
      </div>
    );
  }

  return (
    <div className="DishSettingPage">
      <main>
        <MenuBar />
        <div className={styles.content}>
          <div className={styles.contents}>
            <div className={styles.title}>
              <h3>단품 요리 설정 페이지</h3>
            </div>
            <div className={styles.settingContents}>
              <div className={styles.create}>
                <h4>단품 요리 등록하기</h4>
                <hr />
                <div className={styles.createInput}>
                  <div className={styles.dishInput}>
                    <h5>요리 정보</h5>
                    <label className={styles.inputLabel}>
                      요리 이름{" "}
                      <input
                        name="dishName"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishName}
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      요리 사진 url{" "}
                      <input
                        name="dishPhoto"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishPhoto}
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      요리 가격{" "}
                      <input
                        name="dishPrice"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishPrice}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      요리 상세 설명{" "}
                      <input
                        name="dishDescription"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishDescription}
                        placeholder="230자 이내로 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      요리 분류
                      <select
                        className={styles.inputLabel}
                        id={styles.select}
                        name="dishCategory"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishCategory}
                      >
                        <option key="전식" value="전식">
                          전식
                        </option>
                        <option key="본식" value="본식">
                          본식
                        </option>
                        <option key="후식" value="후식">
                          후식
                        </option>
                      </select>
                    </label>
                    <br />
                  </div>
                  <div className={styles.NutritionFactsInput}>
                    <h5>요리 영양 성분 정보</h5>
                    <label className={styles.inputLabel}>
                      용량(g){" "}
                      <input
                        name="dishServingSize"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishServingSize}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      칼로리(kcal){" "}
                      <input
                        name="dishCalroies"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishCalroies}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      탄수화물(g){" "}
                      <input
                        name="dishCarbohydrate"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishCarbohydrate}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      단백질(g){" "}
                      <input
                        name="dishProtein"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishProtein}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      지방(g){" "}
                      <input
                        name="dishFat"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishFat}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      콜레스테롤(g){" "}
                      <input
                        name="dishCholesterol"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishCholesterol}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      트랜스지방(g){" "}
                      <input
                        name="dishTransFat"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishTransFat}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      당(g){" "}
                      <input
                        name="dishSugars"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishSugars}
                        placeholder="숫자만 입력"
                      />
                    </label>
                    <label className={styles.inputLabel}>
                      나트륨(g){" "}
                      <input
                        name="dishSodium"
                        onChange={handleCreateDishInput}
                        value={createDishInput.dishSodium}
                        placeholder="숫자만 입력"
                      />
                    </label>
                  </div>
                </div>
                <button className={styles.createBtn} onClick={createDishBtn}>
                  등록
                </button>
              </div>
              <br />
              <br />
              <div className={styles.delete}>
                <h4>단품 요리 삭제하기</h4>
                <hr />
                <div className={styles.deleteSearch}>
                  <div className={styles.searchInput}>
                    <label className={styles.searchLabel}>
                      요리 이름{" "}
                      <input
                        name="searchName"
                        onChange={handleSearchDishInput}
                        value={searchDishInput}
                      />
                    </label>
                    <button
                      className={styles.searchBtn}
                      onClick={searchDishBtn}
                    >
                      검색
                    </button>
                  </div>
                  <br />
                  <div className={styles.searchList}>
                    {isLoading ? null : searchDishList.length == 0 ? (
                      <div className={styles.searchNone}>
                        검색어가 포함된 요리가 없습니다.
                      </div>
                    ) : (
                      searchDishList.map((searchData) => (
                        <SearchOutput
                          key={searchData.dishNumber}
                          dishNumber={searchData.dishNumber}
                          dishName={searchData.dishName}
                        />
                      ))
                    )}
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

export default DishSetting;
