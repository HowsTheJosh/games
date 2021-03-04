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
import PlaygroundDef from "./PlaygroundDef";
import Loading from "./Loading";
var twc = 28,
  x = 0,
  statusbol = 0;
var net = null,
  sti,
  faceWarmup = null;
const PredictWebCam = (props) => {
  const webcamRef = useRef(null);
  const [snakeComponentCalled, setSnakeComponentCalled] = useState(false);
  const [testComponentCalled, setTestComponentCalled] = useState(false);
  const [
    playgroundDefComponenetCalled,
    setPlaygroundDefComponenetCalled,
  ] = useState(true);
  const [loadingBool, setLoadingBool] = useState(true);

  useEffect(() => {
    runFacemesh();
    x = document.getElementById("headerdiv").clientHeight;
    twc = document.getElementById("twc").clientWidth;
  }, []);

  const runFacemesh = async () => {
    net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh, {
      maxFaces: 1,
      shouldLoadIrisModel: false,
      iouThreshold: 0,
    });
    // console.log("NET", net);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      webcamRef.current.video.width = twc - 28;

      try {
        const face = await net.estimateFaces({
          input: video,
          predictIrises: false,
        });
        drawMesh(face);
      } catch (err) {}
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

  const drawMesh = (predictions) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;

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
          }
        }
      });
    }
  };

  const startCalling = () => {
    statusbol = 1;
    sti = setInterval(() => {
      detect(net);
    }, 150);
  };

  const stopCalling = () => {
    statusbol = 0;
    clearInterval(sti);
  };

  const checkFaceLoad = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      webcamRef.current.video.width = twc - 28;

      try {
        net = await facemesh.load(
          facemesh.SupportedPackages.mediapipeFacemesh,
          {
            maxFaces: 1,
            shouldLoadIrisModel: false,
            iouThreshold: 0,
          }
        );

        faceWarmup = await net.estimateFaces({
          input: video,
          predictIrises: false,
        });
        // console.log(face);
        while (faceWarmup === null);
        setLoadingBool(false);
      } catch (err) {}
    } else {
      alert("Give Camera Permission Please and Refresh.");
    }
  };
  return (
    <>
      <div className="ui grid" style={{ height: window.innerHeight - x - 60 }}>
        <div
          id="twc"
          className=" three wide column"
          style={{ height: "100%", paddingTop: "0" }}
        >
          <div
            className="ui vertical menu"
            style={{ overflowY: "auto", height: "69%", width: "100%" }}
          >
            <a
              className="item"
              id="showhere"
              onClick={() => {
                checkFaceLoad();
                setTestComponentCalled(false);
                setPlaygroundDefComponenetCalled(false);
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
                setPlaygroundDefComponenetCalled(false);
                setTestComponentCalled(true);
              }}
            >
              <h3>Pac Man</h3>
            </a>
          </div>
          <div>
            <Webcam audio={false} mirrored ref={webcamRef} width={twc - 28} />
          </div>
        </div>
        <div
          id="gamediv"
          className="thirteen wide column"
          style={{ paddingTop: 0 }}
        >
          {playgroundDefComponenetCalled && <PlaygroundDef />}
          {!loadingBool && snakeComponentCalled && (
            <SnakeGame
              currentScore={3}
              start={startCalling}
              stop={stopCalling}
            />
          )}
          {loadingBool && snakeComponentCalled && <Loading />}
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
