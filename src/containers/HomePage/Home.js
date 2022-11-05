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
          title="Lorem ipsum"
          contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image="http://drive.google.com/uc?export=view&id=16f6ZFWpsfVfLp4gsVum0ZVk7bjQa4HxZ"
          float="right"
        />
        <ParallaxContent
          title="Lorem ipsum"
          contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image="http://drive.google.com/uc?export=view&id=1QglTE_2ZbXzQLeP35e4tY3NWB_uAGW4a"
          float="left"
        />
        <ParallaxContent
          title="Lorem ipsum"
          contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image="http://drive.google.com/uc?export=view&id=1FpcAFUvmAC8D8xzTV0M5Ro84jjkgRDud"
          float="right"
        />
      </main>
      <Chat />
      <Footer />
    </div>
  );
}

export default Home;
