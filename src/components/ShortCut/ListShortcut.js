import React from "react";
import { Link } from "react-router-dom";
const btnStyle = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  lineHeight: "50px",
  textAlign: "center",
  backgroundColor: " #424566",
  position: "fixed",
  bottom: "30px",
  right: "3%",
  color: "white",
  borderRadius: "30px",
  boxShadow: "2px 2px 2px gray",
};
const ListShortcut = (props) => {
  return (
    <Link to={"/" + props.link} style={btnStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-list-task"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
        />
        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
        <path
          fillRule="evenodd"
          d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
        />
      </svg>
    </Link>
  );
};
export default ListShortcut;
