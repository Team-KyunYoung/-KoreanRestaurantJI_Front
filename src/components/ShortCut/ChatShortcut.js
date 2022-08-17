import React from "react";
import { Link } from "react-router-dom";
const btnStyle = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  lineHeight: "50px",
  textAlign: "center",
  backgroundColor: " #16193c",
  position: "fixed",
  bottom: "30px",
  right: "3%",
  color: "white",
  borderRadius: "30px",
  boxShadow: "2px 2px 2px gray",
};
const ChatShortcut = () => {
  return (
    <Link to="../Chat" style={btnStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chat-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
      </svg>
    </Link>
  );
};
export default ChatShortcut;
