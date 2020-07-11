import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from "react-redux";
import App from "./../App";
import Settings from "./Settings";

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Route path="/Game" component={App} />
      <Route path="/Settings" component={Settings} />
    </Router>
  </Provider>
);
export default Root;
