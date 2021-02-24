import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SnakeGame from "../Games/Snake/SnakeGame";
import Yag from "../Games/Yag";
import ReactDOM from "react-dom";
import { movement, gameStatus } from "../actions";
import Test from "../Games/PAC-MAN/Test";
import history from "./History";

var twc = 28,
  x = 0,
  statusbol = 0;

const PredictWebCam = (props) => {
  const [snakeComponentCalled, setSnakeComponentCalled] = useState(false);
  const [testComponentCalled, setTestComponentCalled] = useState(false);
  useEffect(() => {
    x = document.getElementById("headerdiv").clientHeight;
    twc = document.getElementById("twc").clientWidth;
  });
  const webcamRef = React.useRef(null);

  const setStatus = (predictedVal) => {
    if (statusbol) {
      if (predictedVal == 0) {
        props.movement("DOWN");
        document.getElementById("status").innerHTML = "DOWN";
      } else if (predictedVal == 1) {
        props.movement("RIGHT");
        document.getElementById("status").innerHTML = "RIGHT";
      } else if (predictedVal == 2) {
        props.movement("LEFT");
        document.getElementById("status").innerHTML = "LEFT";
      } else {
        props.movement("UP");
        document.getElementById("status").innerHTML = "UP";
      }
      // console.log("BEFORE SET TIMEOUT");
      setTimeout(webcapture, 0);
      // console.log("AFTER SET TIMEOUT");
    }
  };

  const webcapture = React.useCallback(() => {
    try {
      const imageSrc = webcamRef.current.getScreenshot().split(",").pop();
      axios
        .post("https://15.207.67.182:5000/predict", {
          imageSrc: imageSrc,
          idd: props.userId,
        })
        .then((res) => setStatus(res.data.Predicted));
    } catch (err) {}
  }, [webcamRef]);

  const startCalling = () => {
    statusbol = 1;
    webcapture();
  };

  const stopCalling = () => {
    statusbol = 0;
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
          <div>GAME LIST</div>
          <div
            className="ui vertical menu"
            style={{ overflowY: "auto", height: "70%", width: "100%" }}
          >
            <a
              className="item"
              id="showhere"
              onClick={() => {
                setTestComponentCalled(false);
                setSnakeComponentCalled(true);
              }}
            >
              <h3>Snake</h3>
            </a>
            <a
              className="item"
              id="showhere"
              onClick={() => {
                setSnakeComponentCalled(false);
                setTestComponentCalled(true);
              }}
            >
              <h3>Pac Man</h3>
            </a>
          </div>
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpg"
              width={twc - 28}
            />
          </div>
        </div>
        <div id="gamediv" className="thirteen wide column">
          {snakeComponentCalled && (
            <SnakeGame start={startCalling} stop={stopCalling} />
          )}
          {testComponentCalled && <Test stop={stopCalling} />}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps, { movement })(PredictWebCam);
