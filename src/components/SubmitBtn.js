import React from "react";

const SubmitBtn = props => {
  return <button>{props.name}</button>;
};
SubmitBtn.defaultProps={
  name:'click me'
}
export default SubmitBtn;