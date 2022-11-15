import React from "react";
import Header from "components/header/Header";
import Chat from "components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import MainCarousel from "./MainCarousel.js";
import ParallaxContent from "./ParallaxContent.js";

function Home() {
  return (
    <div className="homePage">
      <Header />
      <main>
        <header>
          <MainCarousel />
        </header>
        <ParallaxContent
          title="智의 이름을 걸고"
          contents="한식당 智는 여러분에게 최고의 경험을 선물하기 위하여 최선을 다해 서비스할 것입니다."
          image="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEORLToFU7rFAIs3_SFyOpe0xDBwpRGedE-Z5Q5D85_b45ZhdluiE-fnHP_-ZJ4HG0yFXXFnNhAUMgPxq2hRFeRsQquaZ=w757-h867"
          float="right"
        />
        <ParallaxContent
          title="고급스러운 한식의 매력"
          contents="최상의 재료, 수준 높은 요리로 한식의 새로운 경험을 선사해드리겠습니다."
          image="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOSAedQFxDMRRpNUeH7LdXC5CNSWnh1tb6hRsQZzXfpR8gN89pHzXpLIi67ijbLgSHHirDnU578KxTx6CRdQsCUhmxXb=w705-h867"
          float="left"
        />
        <ParallaxContent
          title="전통을 중시하는"
          contents="재료의 준비부터 플레이팅까지 한국 전통을 고수하여 수준 높은 한국 전통의 미를 느끼실 수 있습니다."
          image="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQH00QG-RQ03546HrmSInfe97RH2wpHX5a_0XFedDhw-7cm4It-2DtGq0S-ZEDF3-ThEVwgQGS54CrYajQQLduAcC7O1g=w757-h867"
          float="right"
        />
      </main>
      <Chat />
      <Footer />
    </div>
  );
}

export default Home;
