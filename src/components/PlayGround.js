import React from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { connect } from "react-redux";

var st,
  statusbol = 1;

const PredictWebCam = (props) => {
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
    axios
      .post("https://15.207.67.182:5000/predict", {
        imageSrc: imageSrc,
        idd: props.userId,
      })
      .then((res) => setStatus(res.data.Predicted));
  }, [webcamRef]);

  const stopCalling = () => {
    window.clearTimeout(st);
  };

  const startCalling = () => {
    statusbol = 1;
    webcapture();
  };
  return (
    <>
      <h1>
        <p id="status"></p>
      </h1>
      <Webcam
        audio={false}
        height={640}
        ref={webcamRef}
        screenshotFormat="image/jpg"
        width={320}
      />
      <button onClick={startCalling}>Start</button>
      {/* <button onClick={() => (statusbol = 1)}>Resume</button> */}
      <button onClick={() => (statusbol = 0)}>Stop</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps)(PredictWebCam);
