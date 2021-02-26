import React from "react";
import Typical from "react-typical";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import modalimg from "../Images/modal.png";
import { connect } from "react-redux";
import history from "./History";
import "../CSS/Modal.css";
const step1 = [
  "Hello 👋",
  1000,
  "Welcome to Games-IC 🎮",
  2000,
  "Login with Facebook...",
  2000,
];
// const step2 = ["Welcome to Games-IC", 5000];0
const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      id="main-modal"
      {...props}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-bg" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Steps to follow</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ui grid">
          <div className="six wide column" style={{ fontSize: "25px" }}>
            <p>
              <br />
              Step 1: Login with Facebook
              <br />
              Step 2: Enable camera permissions when asked for
              <br />
              Step 3: For training, refer 👉 image.
              <br />
              Step 4: After the training is complete, hit the next button.
              <br />
              Step 5: Choose the game and start playing with your head
              movements.
              <br />
              Note: Use proper lighting.
            </p>
          </div>
          <div className="wide column">
            <img src={modalimg} style={{ width: "1300%" }} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="ui button massive">
          Got it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
class LandingPage extends React.Component {
  state = { modalShow: false };
  componentDidMount() {
    if (this.props.userId == "" || this.props.userId == "null") {
    } else {
      history.push("/games-ic/data-collection");
    }
  }

  render() {
    return (
      <>
        <div
          style={{
            fontSize: "85px",
            textAlign: "center",
            marginTop: "10%",
            fontFamily: "Courier New",
          }}
        >
          <Typical wrapper="span" steps={step1} loop={Infinity} />
        </div>
        <div
          id="button-left"
          className=" ui green animated  button massive "
          tabIndex="0"
          onClick={() => this.setState({ modalShow: true })}
        >
          <div className="visible content">
            <i className="lightbulb outline icon"></i>Get Started
          </div>
          <div className="hidden content">
            <i className="right arrow icon"></i>
          </div>
        </div>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
        />
        {/* <div className="ui grid" style={{ marginTop: "10%" }}>
          <div
            className="six wide column"
            style={{ backgroundColor: "red", fontSize: "30px" }}
          >
            Steps
            <br />
            Step 1: Login with Facebook
            <br />
            Step 2: Enable camera permissions when asked for
            <br />
            Step 3: For training, refer 👉 image.
            <br />
            Step 4: After the training is complete, hit the next button.
            <br />
            Step 5: Choose the game and start playing with your head movements.
            
          </div>
          <div className="ten wide column">
            <img src={modalimg} style={{ width: "100%" }} />
          </div>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps)(LandingPage);
