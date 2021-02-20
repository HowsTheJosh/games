import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import history from "./History";
import { connect } from "react-redux";
const upBase64 = [],
  downBase64 = [],
  leftBase64 = [],
  rightBase64 = [];
var finalJson = {},
  dataJson = {};

const WebcamCapture = (props) => {
  const [btnToggle, setBtnToggle] = useState(0);
  const upcamRef = React.useRef(null);
  const downcamRef = React.useRef(null);
  const leftcamRef = React.useRef(null);
  const rightcamRef = React.useRef(null);

  const upcapture = React.useCallback(() => {
    for (var i = 0; i < 10; i++) {
      try {
        const imageSrcup = upcamRef.current.getScreenshot().split(",").pop();
        upBase64.push(imageSrcup);
        document.getElementById("upcount").innerHTML =
          "Captured Images for UP: " + upBase64.length;
      } catch (err) {
        document.getElementById("status").innerHTML =
          "Grant camera permissions";
        break;
      }
    }
  }, [upcamRef]);

  const downcapture = React.useCallback(() => {
    for (var i = 0; i < 10; i++) {
      try {
        const imageSrcdown = downcamRef.current
          .getScreenshot()
          .split(",")
          .pop();
        downBase64.push(imageSrcdown);
        document.getElementById("downcount").innerHTML =
          "Captured Images for DOWN: " + downBase64.length;
      } catch (err) {
        document.getElementById("status").innerHTML =
          "Grant camera permissions";
        break;
      }
    }
  }, [downcamRef]);

  const leftcapture = React.useCallback(() => {
    for (var i = 0; i < 10; i++) {
      try {
        const imageSrcleft = leftcamRef.current
          .getScreenshot()
          .split(",")
          .pop();
        leftBase64.push(imageSrcleft);
        document.getElementById("leftcount").innerHTML =
          "Captured Images for LEFT:" + leftBase64.length;
      } catch (err) {
        document.getElementById("status").innerHTML =
          "Grant camera permissions";
        break;
      }
    }
  }, [leftcamRef]);

  const rightcapture = React.useCallback(() => {
    for (var i = 0; i < 10; i++) {
      try {
        const imageSrcright = rightcamRef.current
          .getScreenshot()
          .split(",")
          .pop();
        rightBase64.push(imageSrcright);
        document.getElementById("rightcount").innerHTML =
          "Captured Images for RIGHT: " + rightBase64.length;
      } catch (err) {
        document.getElementById("status").innerHTML =
          "Grant camera permissions";
        break;
      }
    }
  }, [rightcamRef]);

  const arrayToString = (label, b64) => {
    var AtoS = JSON.stringify(Object.assign({}, b64)); // convert array to string
    var temp = JSON.parse(AtoS);
    finalJson[label] = temp;
  };

  const startTraining = () => {
    document.getElementById("status").innerHTML = "Training...";
    document.getElementById("status").style.fontSize = "25px";
    var ub64 = upBase64.length,
      lb64 = leftBase64.length,
      rb64 = rightBase64.length,
      db64 = downBase64.length;
    var val = true;

    arrayToString("up", upBase64);
    arrayToString("down", downBase64);
    arrayToString("right", leftBase64);
    arrayToString("left", rightBase64);
    dataJson["finalJson"] = finalJson;
    dataJson["userId"] = props.userId;
    console.log(dataJson);
    if (ub64 >= 10 && lb64 >= 10 && db64 >= 10 && rb64 >= 10) {
      axios
        .post("https://15.207.67.182/upload", dataJson)
        .then((res) =>
          axios
            .post("https://15.207.67.182/train_data", {
              idd: props.userId,
            })
            .then((res) => setBtnToggle(1))
        )
        .catch(function (error) {
          if (!error.response) {
            document.getElementById("status").innerHTML = "NETWORK ERROR";
            document.getElementById("status").style.fontSize = "25px";
          }
        });
    } else {
      document.getElementById("status").innerHTML = "Enter missing DATA";
      document.getElementById("status").style.fontSize = "25px";
    }
  };

  const setTrainBtn = () => {
    if (btnToggle == 0) {
      return;
    } else {
      document.getElementById("status").innerHTML = "Trained";
      document.getElementById("status").style.fontSize = "25px";
      return (
        <button
          className="ui button"
          style={{ marginTop: "3%" }}
          onClick={() => history.push("/playground")}
        >
          Next
        </button>
      );
    }
  };
  return (
    <div className="container">
      <div
        className="ui segment "
        style={{ textAlign: "center", fontSize: "20px" }}
      >
        Data Collection
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col" style={{ margin: "0 auto", textAlign: "center" }}>
          <Webcam
            onClick={upcapture}
            audio={false}
            ref={upcamRef}
            screenshotFormat="image/jpg"
            width={320}
          />
          <p id="upcount" style={{ textAlign: "center" }}>
            Captured Images for UP: 0
          </p>
        </div>
        <div className="col"></div>
      </div>

      <div className="row">
        <div className="col" style={{ margin: "0 auto", textAlign: "center" }}>
          <Webcam
            onClick={leftcapture}
            audio={false}
            ref={leftcamRef}
            screenshotFormat="image/jpg"
            width={320}
          />
          <p id="leftcount" style={{ textAlign: "center" }}>
            Captured Images for LEFT: 0
          </p>
        </div>
        <div className="col" style={{ margin: "0 auto", textAlign: "center" }}>
          <button
            onClick={startTraining}
            className="ui button"
            style={{ marginTop: "25%" }}
          >
            Train
          </button>
          <div>
            <p
              id="status"
              style={{ margin: "0 auto", textAlign: "center" }}
            ></p>
            {setTrainBtn()}
          </div>
        </div>
        <div className="col" style={{ margin: "0 auto", textAlign: "center" }}>
          <Webcam
            onClick={rightcapture}
            audio={false}
            ref={rightcamRef}
            screenshotFormat="image/jpg"
            width={320}
          />
          <p id="rightcount" style={{ textAlign: "center" }}>
            Captured Images for RIGHT: 0
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col"></div>
        <div className="col" style={{ margin: "0 auto", textAlign: "center" }}>
          <Webcam
            onClick={downcapture}
            audio={false}
            ref={downcamRef}
            screenshotFormat="image/jpg"
            width={320}
          />
          <p id="downcount" style={{ textAlign: "center" }}>
            Captured Images for DOWN: 0
          </p>
        </div>
        <div className="col"></div>
      </div>

      <div></div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps)(WebcamCapture);
