import RoomService from "lib/api/RoomService";
import React, { useState } from "react";

import styles from "./Admin.module.scss";
import MenuBar from "./MenuBar";

const RoomSetting = () => {
  const [createRoomInput, setCreateRoomInput] = useState({
    roomName: "",
    roomImg: ""
  });
  const handleCreateRoomInput = (e)=>{
    setCreateRoomInput({
      ...createRoomInput,
      [e.target.name] : e.target.value,
    });
  }
  function createRoomBtn() {
    RoomService.createRoom(createRoomInput)
    .then(() => {
      alert("객실 정보가 등록되었습니다.")
      setCreateRoomInput({
        roomName: "",
        roomImg: ""
      })
    })
    .catch((error) => {
      console.log(error.response);
      alert("객실 등록에 실패하였습니다.")
    });
  }

  const [searchRoomInput, setSearchRoomInput] = useState("");
  const handleSearchRoomInput = (e)=>{  setSearchRoomInput(e.target.value);  }
  const [searchRoomList, setSearchRoomList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  function searchRoomBtn() {
    RoomService.searchRoom(searchRoomInput)
    .then((response) => {
      setSearchRoomInput("")
      setSearchRoomList(response.data.data)
      setIsLoading(false)
    })
    .catch((error) => {
      setSearchRoomList([])
      setIsLoading(false)
      console.log(error.response);
    });
  }
  function deleteRoomBtn(RoomNumber) {
    RoomService.deleteRoom(RoomNumber)
    .then((response) => {
      alert("해당 객실 데이터가 삭제되었습니다.")
      window.location.reload()
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
  function SearchOutput({roomNumber, roomName}){
    return(
      <div className={styles.searchItem}>
        <span>{roomNumber}</span>
        <span>{roomName}</span>
        <button className={styles.deleteBtn} onClick={() => deleteRoomBtn(roomNumber)}>삭제</button>
      </div>
    )
  }

  return (
    <div className="RoomSettingPage">
      <main>
        <MenuBar/>
        <div className={styles.content}>
            <div className={styles.contents}>
              <div className={styles.title}><h3>객실 설정 페이지</h3></div>
              <div className={styles.settingContents}>
                <div className={styles.create}>
                    <h4>객실 등록하기</h4><hr/>
                    <div className={styles.createInput}>
                      <div className={styles.roomInput}>
                        <label className={styles.inputLabel}>객실 이름 <input name="roomName" onChange={handleCreateRoomInput} value={createRoomInput.roomName}/></label>
                        <label className={styles.inputLabel}>객실 사진 url <input name="roomImg" onChange={handleCreateRoomInput} value={createRoomInput.roomImg}/></label>
                        <button className={styles.createBtn} onClick={createRoomBtn}>등록</button>
                      </div>
                    </div>
                </div><br/>
                <div className={styles.delete}>
                    <h4>객실 정보 삭제하기</h4><hr/>
                    <div className={styles.deleteSearch}>
                      <div className={styles.searchInput}>
                        <label className={styles.searchLabel}>객실 이름 <input name="searchName" onChange={handleSearchRoomInput} value={searchRoomInput}/></label>
                        <button className={styles.searchBtn} onClick={searchRoomBtn}>검색</button>
                      </div><br/>
                      <div className={styles.searchList}>
                        { isLoading ? null :
                          searchRoomList.length == 0 ? <div className={styles.searchNone}>검색어가 포함된 객실이 없습니다.</div>
                          : searchRoomList.map( searchData => (
                            <SearchOutput key={searchData.roomNumber}
                              roomNumber={searchData.roomNumber}
                              roomName={searchData.roomName}
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

export default RoomSetting;
