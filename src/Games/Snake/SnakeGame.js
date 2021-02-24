import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import "./SnakeGame.css";
import { connect } from "react-redux";
import Obstacle from "./Obstacle";

var interval_time = 0,
  w = 0,
  h = 0,
  currentScore = 0;

const getRandomCoordinates = () => {
  w = window.innerWidth;
  h = window.innerHeight;
  console.log(w, h);
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const generateObstacle = () => {
  let min = 1,
    max = 98;
  for (var i = 1; i <= 5; i++) {}
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 100,
  direction: "RIGHT",
  snakeDots: [
    [0, 50],
    [2, 50],
    [4, 50],
  ],
  renderButtonBol: 0,
};
const obstacle = [
  [20, 20],
  [20, 22],
  [20, 24],
  [20, 26],
  [20, 28],
  [20, 30],
  [20, 32],
  [20, 34],
  [50, 22],
  [50, 24],
  [50, 26],
  [50, 28],
  [50, 30],
  [50, 32],
  [50, 34],
];
class SnakeGame extends Component {
  state = initialState;

  startgame = () => {
    this.setState({ renderButtonBol: 1 });
    clearInterval(interval_time);
    this.props.start();
    interval_time = setInterval(this.moveSnake, this.state.speed);
  };

  stopgame = () => {
    this.setState({ renderButtonBol: 0 });
    this.props.stop();
    clearInterval(interval_time);
  };
  componentDidMount() {
    this.props.stop();
  }
  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    switch (this.props.dir_val) {
      case "RIGHT":
        if (this.state.direction === "LEFT") {
          head = [head[0] - 2, head[1]];
          break;
        } else {
          this.setState({ direction: this.props.dir_val });
          head = [head[0] + 2, head[1]];
          break;
        }
      case "LEFT":
        if (this.state.direction === "RIGHT") {
          head = [head[0] + 2, head[1]];
          break;
        } else {
          this.setState({ direction: this.props.dir_val });
          head = [head[0] - 2, head[1]];
          break;
        }
      case "DOWN":
        if (this.state.direction === "UP") {
          head = [head[0], head[1] - 2];
          break;
        } else {
          this.setState({ direction: this.props.dir_val });
          head = [head[0], head[1] + 2];
          break;
        }
      case "UP":
        if (this.state.direction === "DOWN") {
          head = [head[0], head[1] + 2];
          break;
        } else {
          this.setState({ direction: this.props.dir_val });
          head = [head[0], head[1] - 2];
          break;
        }
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    obstacle.forEach((dot) => {
      // console.log(dot[0]);
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
      currentScore = currentScore + 1;
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
    this.props.stop();
    clearInterval(interval_time);
  }
  renderButton = () => {
    if (this.state.renderButtonBol == 0) {
      return (
        <button className="ui button" id="startgame" onClick={this.startgame}>
          Start
        </button>
      );
    } else {
      return (
        <button className="ui button" id="stopgame" onClick={this.stopgame}>
          Pause
        </button>
      );
    }
  };
  render() {
    return (
      <>
        <h1>Current Score:{currentScore}</h1>
        <div
          id="myDiv"
          className="game-area"
          style={{ height: h * 0.8, width: w * 0.5 }}
        >
          <Snake snakeDots={this.state.snakeDots} />
          <Obstacle obs={obstacle} />
          <Food dot={this.state.food} />
        </div>
        <div>{this.renderButton()}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { dir_val: state.auth.dir };
};

export default connect(mapStateToProps)(SnakeGame);
