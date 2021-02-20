import React from "react";
import axios from "axios";
const upBase64 = [],
  downBase64 = [],
  leftBase64 = [],
  rightBase64 = [];
var upbol = 0,
  downbol = 0,
  leftbol = 0,
  rightbol = 0;
var finalJson = {};
class DataUploader extends React.Component {
  state = { upFile: [], downFile: [], leftFile: [], rightFile: [] };
  onUpFileChange = (e) => {
    this.setState({
      upFile: [...this.state.upFile, ...e.target.files],
    });
    upbol = 1;
  };

  onDownFileChange = (e) => {
    this.setState({
      downFile: [...this.state.downFile, ...e.target.files],
    });
    downbol = 1;
  };
  onLeftFileChange = (e) => {
    this.setState({
      leftFile: [...this.state.leftFile, ...e.target.files],
    });
    leftbol = 1;
  };

  onRightFileChange = (e) => {
    this.setState({
      rightFile: [...this.state.rightFile, ...e.target.files],
    });
    rightbol = 1;
  };
  iterateOverUpFiles = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var base64 = reader.result;
        base64 = base64.split(",").pop();
        upBase64.push(base64);
        // console.log(upBase64);
      };
      reader.onerror = (error) => {
        console.log("error", error);
      };
    }
  };
  iterateOverDownFiles = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var base64 = reader.result;
        base64 = base64.split(",").pop();
        downBase64.push(base64);
        // console.log(downBase64);
      };
      reader.onerror = (error) => {
        console.log("errorj", error);
      };
    }
  };
  iterateOverLeftFiles = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var base64 = reader.result;
        base64 = base64.split(",").pop();
        leftBase64.push(base64);
        // console.log(downBase64);
      };
      reader.onerror = (error) => {
        console.log("errorj", error);
      };
    }
  };

  iterateOverRightFiles = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var base64 = reader.result;
        base64 = base64.split(",").pop();
        rightBase64.push(base64);
        // console.log(downBase64);
      };
      reader.onerror = (error) => {
        console.log("errorj", error);
      };
    }
  };
  // arrayToString = (finalJson, label, b64) => {
  //   var AtoS = JSON.stringify(Object.assign({}, b64)); // convert array to string
  //   var temp = JSON.parse(AtoS);
  //   finalJson.push({ label: temp });
  // };
  submitData = () => {
    // this.arrayToString(finalJson, "up", upBase64);
    var upAtoS = JSON.stringify(Object.assign({}, upBase64)); // convert array to string
    var upJson = JSON.parse(upAtoS);
    var downAtoS = JSON.stringify(Object.assign({}, downBase64)); // convert array to string
    var downJson = JSON.parse(downAtoS);
    var leftAtoS = JSON.stringify(Object.assign({}, leftBase64)); // convert array to string
    var leftJson = JSON.parse(leftAtoS);
    var rightAtoS = JSON.stringify(Object.assign({}, rightBase64)); // convert array to string
    var rightJson = JSON.parse(rightAtoS);
    var finalJson = {
      up: upJson,
      down: downJson,
      left: leftJson,
      right: rightJson,
    };
    console.log(finalJson);
    axios
      .post("https://15.207.67.182:5000/upload", finalJson)
      .then((res) => (document.getElementById("status").innerHTML = res.data));
  };
  render() {
    if (upbol) {
      this.state.upFile.map(this.iterateOverUpFiles);
      upbol = 0;
    }
    if (downbol) {
      this.state.downFile.map(this.iterateOverDownFiles);
      downbol = 0;
    }
    if (leftbol) {
      this.state.leftFile.map(this.iterateOverLeftFiles);
      leftbol = 0;
    }
    if (rightbol) {
      this.state.rightFile.map(this.iterateOverRightFiles);
      rightbol = 0;
    }
    return (
      <div>
        <label>Up:</label>
        <input
          className="UpFile"
          type="file"
          accept=".jpg"
          multiple
          onChange={this.onUpFileChange}
        />
        <label>Down:</label>
        <input
          className="DownFile"
          type="file"
          accept=".jpg"
          multiple
          onChange={this.onDownFileChange}
        />
        <label>Left:</label>
        <input
          className="LeftFile"
          type="file"
          accept=".jpg"
          multiple
          onChange={this.onLeftFileChange}
        />
        <label>Right:</label>
        <input
          className="RightFile"
          type="file"
          accept=".jpg"
          multiple
          onChange={this.onRightFileChange}
        />
        <p id="status"></p>
        <div>{}</div>

        {/* <div>{console.log(this.state.upFile)}</div> */}
        {/* <div>{console.log(this.state.downFile)}</div> */}
        <button onClick={this.submitData}>ehgjk</button>
      </div>
    );
  }
}

export default DataUploader;
