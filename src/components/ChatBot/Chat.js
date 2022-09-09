import React from "react";
import styles from './Chat.module.scss';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from "react-router-dom";

import Logo_Img from '../../assets/ChatBot/ChatBot_Logo.png';

function ToLink(data) {
    console.log(data.link)
  return(
    <div className={styles.link_button}><Link to={data.link}>해당 페이지로 이동하기</Link></div>
  )
}

// Set some properties of the bot
const config = {
  botAvatar: Logo_Img,
  floating: true,
  placeholder: ' 채팅이 불가능한 채널입니다.',
  hideSubmitButton: true,
  hideUserAvatar: true
};
 
// Creating our own theme
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#424566',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#424566',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
      id: '0',
      message: '안녕하세요, 智의 chat bot입니다.',

      // This calls the next id
      // i.e. id 1 in this case
      trigger: '1',
  }, {
      id: '1',

      // This message appears in
      // the bot chat bubble
      message: '궁금하신 내용이 아래 사항에 있다면, 선택해주세요.',
      trigger: '2'
  }, {
      id: '2',
      options: [
          // When we need to show a number of
          // options to choose we create alist
          // like this
          { value: 1, label: '코스/메뉴 확인하기', trigger: 'Dish' },
          { value: 2, label: '방문 포장 주문하기', trigger: 'Order' },
          { value: 3, label: '식당 좌석 예약하기', trigger: 'Reservation' },
          { value: 4, label: '식당 위치 확인하기', trigger: 'Map' },
          { value: 5, label: '예약/주문 내역 확인하기', trigger: 'UserInfo' },
          { value: 6, label: '문의하기', trigger: 'QNA' },
          { value: 7, label: '기타', trigger: 'etc' },
        ]
  }, {
      id: 'Dish',
      message: " 코스와 일반 메뉴 중 보고싶으신 것을 선택해주세요.",
      trigger: 'Dish-select'
  }, {
      id: 'Dish-select',
      options: [
          { value: 1, label: '코스 요리 확인', trigger: 'Dish-Course-link' },
          { value: 2, label: '일반 메뉴 확인', trigger: 'Dish-link' },
        ]
  }, {
      id: 'Dish-Course-link',
      component: <ToLink link="/Course"/>,
      trigger: 'reQuestion'
  }, {
      id: 'Dish-link',
      component: <ToLink link="/Dish"/>,
      trigger: 'reQuestion'
  }, {
      id: 'Order',
      message: " 아래 버튼을 클릭하면 주문 페이지로 이동합니다. 이곳에서 주문을 완료해주세요.",
      trigger: 'Order-link'
  }, {
      id: 'Order-link',
      component: <ToLink link="/Order"/>,
      trigger: 'reQuestion'
  }, {
      id: 'Reservation',
      message: " 아래 페이지에서 예약을 진행하실 수 있습니다.",
      trigger: 'Reservation2'
  }, {
      id: 'Reservation2',
      message: " 룸을 선택해 주시고, 필요한 정보를 입력 후 원하는 시간대를 선택하여 예약하시면 됩니다.",
      trigger: 'Reservation-link'
  }, {
      id: 'Reservation-link',
      component: <ToLink link="/SelectRoom"/>,
      trigger: 'reQuestion'
  }, {
      id: 'Map',
      message: " 아래 링크에서 식당의 정확한 위치정보를 네이버 지도로 확인하실 수 있습니다.",
      trigger: 'Map-link'
  }, {
      id: 'Map-link',
      component: <ToLink link="/Map"/>,
      trigger: 'reQuestion'
  }, {
      id: 'UserInfo',
      message: " 어떤 것을 확인하시고 싶으신가요?",
      trigger: 'UserInfo-select'
  }, {
      id: 'UserInfo-select',
      options: [
          { value: 1, label: '방문 포장 주문 확인', trigger: 'UserInfo-Order-link' },
          { value: 2, label: '식당 좌석 예약 확인', trigger: 'UserInfo-Reservation-link' },
        ]
  }, {
      id: 'UserInfo-Order-link',
      component: <ToLink link="/UserInfo/ordered"/>,
      trigger: 'reQuestion'
  }, {
      id: 'UserInfo-Reservation-link',
      component: <ToLink link="/UserInfo/reservation"/>,
      trigger: 'reQuestion'
  }, {
      id: 'QNA',
      message: " 문의 목록을 확인하고 싶으신가요? 아니면 문의를 하고 싶으신가요?",
      trigger: 'QNA-link'
  }, {
      id: 'QNA',
      options: [
          { value: 1, label: '문의 목록 확인', trigger: 'QNA-Board' },
          { value: 2, label: '문의 하기', trigger: 'QNA-Post' },
      ]
  }, {
      id: 'QNA-Board',
      message: " 아래 버튼을 눌러 문의 목록을 확인하실 수 있습니다.",
      trigger: 'QNA-Board-link'
  }, {
      id: 'QNA-Board-link',
      component: <ToLink link="/QnABoard"/>,
      trigger: 'reQuestion'
  }, {
      id: 'QNA-Post',
      message: " 아래 버튼을 눌러 문의를 작성하실 수 있습니다.",
      trigger: 'QNA-Post-link'
  }, {
      id: 'QNA-Post-link',
      component: <ToLink link="/Question"/>,
      trigger: 'reQuestion'
  }, {
      id: 'etc',
      message: " 그 밖의 문의 사항은 FAQ를 확인해 주시고, 관련 문의 사항이 없다면 QNA 페이지에 문의 남겨주세요.",
      trigger: 'etc-Select'
  }, {
      id: 'etc-Select',
      options: [
          { value: 1, label: 'FAQ 확인하기', trigger: 'FAQ-Board' },
          { value: 2, label: 'QNA 문의 작성하기', trigger: 'QNA-Post-link' },
      ]
  }, {
      id: 'FAQ-Board',
      component: <ToLink link="/FAQBoard"/>,
      trigger: 'reQuestion_select'
  }, {
      id: 'reQuestion',
      message: '더 궁금하신 사항이 있으시면 버튼을 눌러주세요',
      trigger: 'reQuestion_select'
  }, {
      id: 'reQuestion_select',
      options: [
          { value: 1, label: '더 질문하기', trigger: '2' }
      ]
  }
];

const Chat = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floatingStyle= {{}}
        bubbleOptionStyle= {{ backgroundColor: "#f5f8fb", color: "#424566", border: '2px solid #424566', 
                              hover: {backgroundColor: "#424566", color: "#fff"} }}   //hover 적용 안됨. 하는 법 모르겠음
        customStyle= {{ width: '250px', border: '2px solid #424566', transform: 'translate(19%, 0%)' }}
        headerTitle = '&ensp; 智 문의하기'
        steps={steps}
        {...config}
      />
    </ThemeProvider>
  );
};

export default Chat;