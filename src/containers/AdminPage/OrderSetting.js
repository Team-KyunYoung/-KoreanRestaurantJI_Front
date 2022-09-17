import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const OrderSettingPage = () => {

  return (
    <div className="OrderSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>주문 설정 페이지</h3></div>
              <div className={styles.settingContents}>
                <div className={styles.update}>
                    <h3>현재 주문 목록</h3>
                    <div className={styles.orderList}>
                      <div>
                        <div>주문자명</div>
                        <div>주문 시간</div>
                        <div>주문 상태 
                            <select>
                                <option>주문대기</option>
                                <option>준비중</option>
                                <option>수령대기</option>
                                <option>수령완료</option>
                                <option>주문취소</option>
                            </select>
                            <button>저장</button>
                        </div>
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

export default OrderSettingPage;
