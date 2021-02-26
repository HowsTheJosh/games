import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import "./SnakeGame.css";
import { connect } from "react-redux";
import Obstacle from "./Obstacle";

var interval_time = 0,
  w = 0,
  h = 0,
  currentScore = 3;

const obstacle = [
  [20, 20],
  [20, 22],
  [20, 24],
  [20, 26],
  [20, 28],
  [20, 30],
  [80, 20],
  [80, 22],
  [80, 24],
  [80, 26],
  [80, 28],
  [80, 30],
  [20, 70],
  [20, 72],
  [20, 74],
  [20, 76],
  [20, 78],
  [20, 80],
  [80, 70],
  [80, 72],
  [80, 74],
  [80, 76],
  [80, 78],
  [80, 80],
];
const getRandomCoordinates = () => {
  w = window.innerWidth;
  h = window.innerHeight;
  let min = 1;
  let max = 98;
  while (1) {
    var z = 1;
    var x = Math.floor((Math.random() * (98 - 1 + 1) + 1) / 2) * 2;
    var y = Math.floor((Math.random() * (98 - 1 + 1) + 1) / 2) * 2;
    for (let i = 0; i < 24; i++) {
      if (obstacle[i][0] === x && obstacle[i][1] === y) {
        z = 0;
        break;
      }
    }
    if (z == 1) {
      break;
    }
  }

  return [x, y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 150,
  direction: "RIGHT",
  snakeDots: [
    [0, 50],
    [2, 50],
    [4, 50],
  ],
  renderButtonBol: 0,
};
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
    currentScore = 3;
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
        <div style={{ textAlign: "center" }}>
          <h3>
            <div>Current Score:{currentScore}</div>
          </h3>
        </div>
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
  return { dir_val: state.moveReducer.dir };
};

export default connect(mapStateToProps)(SnakeGame);
