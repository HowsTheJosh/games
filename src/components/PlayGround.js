import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SnakeGame from "../Games/Snake/SnakeGame";
import Yag from "../Games/Yag";
import ReactDOM from "react-dom";
var twc = 28,
  x = 0,
  statusbol = 1;

const PredictWebCam = (props) => {
  const [h, setH] = useState(0);
  useEffect(() => {
    x = document.getElementById("headerdiv").clientHeight;
    twc = document.getElementById("twc").clientWidth;
  });
  const webcamRef = React.useRef(null);

  const setStatus = (val) => {
    if (statusbol) {
      if (val == 0) {
        document.getElementById("status").innerHTML = "DOWN";
      } else if (val == 1) {
        document.getElementById("status").innerHTML = "RIGHT";
      } else if (val == 2) {
        document.getElementById("status").innerHTML = "LEFT";
      } else {
        document.getElementById("status").innerHTML = "UP";
      }
      setTimeout(webcapture, 500);
    }
  };

  const webcapture = React.useCallback(() => {
    // statusbol = 1;
    const imageSrc = webcamRef.current.getScreenshot().split(",").pop();
    // axios
    //   .post("https://15.207.67.182:5000/predict", {
    //     imageSrc: imageSrc,
    //     idd: props.userId,
    //   })
    //   .then((res) => setStatus(res.data.Predicted));
  }, [webcamRef]);

  const startCalling = () => {
    statusbol = 1;
    webcapture();
  };
  return (
    <>
      <h1>
        <p id="status"></p>
      </h1>

      <div className="ui grid" style={{ height: window.innerHeight - x - 60 }}>
        <div
          id="twc"
          className=" three wide column "
          style={{ height: "100%" }}
        >
          <div
            className="ui vertical menu"
            style={{ overflowY: "auto", height: "70%", width: "100%" }}
          >
            <a
              className="item"
              id="showhere"
              onClick={() =>
                ReactDOM.render(
                  <SnakeGame start={startCalling} />,
                  document.getElementById("gamediv")
                )
              }
            >
              Snake
            </a>
            <a
              className="item"
              id="showhere"
              onClick={() =>
                ReactDOM.render(<Yag />, document.getElementById("gamediv"))
              }
            >
              YAG
            </a>
          </div>
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpg"
              width={twc - 28}
            />
            {/* <button onClick={startCalling}>Start</button> */}
            <button onClick={() => (statusbol = 0)}>Stop</button>
          </div>
        </div>
        <div id="gamediv" className="thirteen wide column"></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps)(PredictWebCam);
