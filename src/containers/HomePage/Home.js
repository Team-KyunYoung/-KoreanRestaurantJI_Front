import React from "react";
import './Style.scss';
import logo from '../../assets/logo.svg';
//import SubmitBtn from "../../components/<컴포넌트명>";
import CounterHook from "./CounterHook";//훅
function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          우리 열심히 프로젝트 해보쟈🤤 화이팅!<br/>
          최선을 다 하겠어..!(〃￣︶￣)人(￣︶￣〃)
        </p>
        <a
          className="Home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CounterHook/>
      </header>
    </div>
  );
}

export default Home;
