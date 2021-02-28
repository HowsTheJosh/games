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
// import { drawMesh } from "./utilities";

var twc = 28,
  x = 0,
  statusbol = 0;
var net, sti;
const PredictWebCam = (props) => {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);
  const [snakeComponentCalled, setSnakeComponentCalled] = useState(false);
  const [testComponentCalled, setTestComponentCalled] = useState(false);

  useEffect(() => {
    runFacemesh();
    x = document.getElementById("headerdiv").clientHeight;
    twc = document.getElementById("twc").clientWidth;
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

  const calculateAngleRatio = (
    nose_x,
    nose_y,
    left_x,
    left_y,
    right_x,
    right_y,
    up_x,
    up_y,
    down_x,
    down_y
  ) => {
    var dAx = right_x - nose_x;
    var dAy = right_y - nose_y;
    var dBx = nose_x - left_x;
    var dBy = nose_y - left_y;
    var angleUD = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
    var degree_angleUD = angleUD * (180 / Math.PI);
    var dCx = up_x - nose_x;
    var dCy = up_y - nose_y;
    var dDx = nose_x - down_x;
    var dDy = nose_y - down_y;
    var angleLR = Math.atan2(dCx * dDy - dCy * dDx, dCx * dDx + dCy * dDy);
    var degree_angleLR = angleLR * (180 / Math.PI);
    return [degree_angleUD, degree_angleLR];
  };

  // Drawing Mesh
  const drawMesh = (predictions) => {
    console.log("inside drawMesh");
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;

        //find vector components
        var [angleUD, angleLR] = calculateAngleRatio(
          keypoints[1][0],
          keypoints[1][1],
          keypoints[93][0],
          keypoints[93][1],
          keypoints[323][0],
          keypoints[323][1],
          keypoints[9][0],
          keypoints[9][1],
          keypoints[199][0],
          keypoints[199][1]
        );
        if (
          (angleLR < -20 || angleLR > 20) &&
          (angleUD < -30 || angleUD > 40)
        ) {
          if (angleLR < -20) {
            props.movement("RIGHT");
          } else if (angleLR > 20) {
            props.movement("LEFT");
          }
        } else {
          if (angleUD < -30) {
            props.movement("UP");
          } else if (angleUD > 40) {
            props.movement("DOWN");
          } else {
            // props.movement("sdfkj");
          }
        }
      });
    }
  };

  const startCalling = () => {
    statusbol = 1;
    sti = setInterval(() => {
      detect(net);
    }, 250);
  };

  const stopCalling = () => {
    statusbol = 0;
    clearInterval(sti);
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
  return { ...state };
};
export default connect(mapStateToProps, { movement })(PredictWebCam);
