import React from "react";
import Header from "components/header/Header";
import Chat from "components/ChatBot/Chat";
import Footer from "components/footer/Footer";
import MainCarousel from "./MainCarousel.js";
import ParallaxContent from "./ParallaxContent.js";

function Home() {
  const image1 = "https://picsum.photos/1200/600";
  const image2 = "https://picsum.photos/1200/500";

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
          image={image1}
          float="right"
        />
        <ParallaxContent
          title="Lorem ipsum"
          contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image={image2}
          float="left"
        />
        <ParallaxContent
          title="Lorem ipsum"
          contents="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          image={image1}
          float="right"
        />
      </main>
      <Chat />
      <Footer />
    </div>
  );
}

export default Home;
