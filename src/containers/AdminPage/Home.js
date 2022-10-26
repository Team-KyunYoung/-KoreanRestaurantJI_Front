import UserService from "lib/api/UserService";
import React, { useEffect, useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const AdminHome = () => {
  const [userList, setUserList] = useState([]);
  const [isRoading, setIsRoading] = useState(true);
  useEffect(() => {
    UserService.findAll()
      .then((response) => {
        setUserList(response.data.data)
        setIsRoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function handleDelete(userNumber){
    if (window.confirm("정말 삭제하시겠습니까?")) {
      UserService.deleteUserByNumber(userNumber)
      .then(() => {
        alert("해당 회원을 탈퇴(데이터 삭제) 하였습니다.")
      })
      .catch((error) => {
        console.log(error);
        alert("삭제 실패. 콘솔창을 확인해주세요.")
      });
    }
  }
  function UserList({userNumber, role, userEmail, userNickname}) {
      return(
        <div className={styles.user}>
          <span>{userNumber}</span>&nbsp;<span>{role ? "관리자" : "일반"}</span>&nbsp;<span>{userEmail}</span>&nbsp;
          <span>{userNickname}</span>
          <button onClick={()=>handleDelete(userNumber)}>삭제</button>
        </div>
      )
  }

  return (
    <div className="AdminHomePage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>Korean Restaurant Ji 관리자 페이지</h3></div>
              <div className={styles.settingContents}>
                <div className={styles.findAll}>
                  <h4>사용자 목록</h4><hr/>
                  <div className={styles.userList}>
                      {isRoading ? null :
                        userList.length == 0 ? <div>회원 내역이 없습니다.</div> :
                        userList.map( userData => (
                           <UserList key={userData.userNumber}
                            userNumber={userData.userNumber}
                            role={userData.role}
                            userEmail={userData.userEmail}
                            userNickname={userData.userNickname}/>
                          ))
                      }
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
