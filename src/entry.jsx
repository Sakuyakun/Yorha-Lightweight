import { AppContainer as HotReloader } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import Normalize from "./normalize.css";

// component
import Index from './index';

// render
const rootEle = document.getElementById("app");
const render = Component => {
  ReactDOM.render(
    <HotReloader>
      <Component />
    </HotReloader>,
    rootEle
  );
};

render(Index);

// hot replace
if (module.hot) {
  module.hot.accept("./index", () => render(Index));
}
