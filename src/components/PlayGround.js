import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { connect } from "react-redux";
import SnakeGame from "../Games/Snake/SnakeGame";
import { movement } from "../actions";
import Test from "../Games/PAC-MAN/Test";
import history from "./History";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utilities";

var twc = 28,
  x = 0,
  statusbol = 0;
var net;
const PredictWebCam = (props) => {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);
  const [snakeComponentCalled, setSnakeComponentCalled] = useState(false);
  const [testComponentCalled, setTestComponentCalled] = useState(false);

  useEffect(() => {
    runFacemesh();

    x = document.getElementById("headerdiv").clientHeight;
    twc = document.getElementById("twc").clientWidth;

    if (props.userId == "" || props.userId == "null") {
      // history.push("/games-ic/");
    }
  }, []);

  const runFacemesh = async () => {
    // NEW MODEL
    net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh, {
      maxFaces: 1,
    });
    console.log("MODEL LOADED");
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      webcamRef.current.video.width = twc - 28;

      const face = await net.estimateFaces({ input: video });

      requestAnimationFrame(() => {
        drawMesh(face);
      });
    }
  };
  //face mesh end

  // const setStatus = (predictedVal) => {
  //   if (statusbol) {
  //     if (predictedVal == 0) {
  //       props.movement("DOWN");
  //       // document.getElementById("status").innerHTML = "DOWN";
  //     } else if (predictedVal == 1) {
  //       props.movement("RIGHT");
  //       // document.getElementById("status").innerHTML = "RIGHT";
  //     } else if (predictedVal == 2) {
  //       props.movement("LEFT");
  //       // document.getElementById("status").innerHTML = "LEFT";
  //     } else {
  //       props.movement("UP");
  //       // document.getElementById("status").innerHTML = "UP";
  //     }
  //     // setTimeout(webcapture, 0);
  //   }
  // };

  // const webcapture = React.useCallback(() => {
  //   try {
  //     const imageSrc = webcamRef.current.getScreenshot().split(",").pop();
  //     axios
  //       .post("https://15.207.67.182:5000/predict", {
  //         imageSrc: imageSrc,
  //         idd: props.userId,
  //       })
  //       .then((res) => setStatus(res.data.Predicted));
  //   } catch (err) {}
  // }, [webcamRef]);

  const startCalling = () => {
    statusbol = 1;
    setInterval(() => {
      detect(net);
    }, 1000);
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
        <div id="twc" className=" three wide column" style={{ height: "100%" }}>
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
            <Webcam audio={false} mirrored ref={webcamRef} width={twc - 28} />
            {/* <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            /> */}
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
