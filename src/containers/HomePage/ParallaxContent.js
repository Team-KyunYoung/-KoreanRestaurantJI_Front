import React from "react";
import { Parallax } from "react-parallax";
const ParallaxContent = (props) => {
  let { image, title, contents } = props;
  const imageStyle = {
    display: "inline-block",
    width: "60%",
    height: "500px",
    marginTop: "100px",
  };
  const textStyle = {
    width: "40%",
    height: "500px",
    marginTop: "100px",
    padding: "40px",
    float: props.float,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <article>
      <Parallax bgImage={image} strength={500} style={imageStyle}>
        <div style={{ height: 500 }}></div>
      </Parallax>
      <div style={textStyle}>
        <h2>{title}</h2>
        {contents}
      </div>
    </article>
  );
};

export default ParallaxContent;
