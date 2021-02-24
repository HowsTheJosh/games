import React from "react";

export default (props) => {
  return (
    <div>
      {props.obs.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
          backgroundColor: "black",
        };
        return <div className="snake-dot" key={i} style={style}></div>;
      })}
    </div>
  );
};
