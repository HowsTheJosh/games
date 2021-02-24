import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import reducers from "./reducers";
import PlayGround from "./components/PlayGround";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.querySelector("#root")
);
