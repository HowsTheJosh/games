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
export const drawMesh = (predictions) => {
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
      if ((angleLR < -20 || angleLR > 20) && (angleUD < -30 || angleUD > 40)) {
        if (angleLR < -20) {
          console.log("Right");
        } else if (angleLR > 20) {
          console.log("Left");
        }
      } else {
        if (angleUD < -30) {
          console.log("Up");
        } else if (angleUD > 40) {
          console.log("Down");
        } else {
          console.log("sdfkj");
        }
      }
    });
  }
};
