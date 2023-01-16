import React, { useContext, useState } from "react";

import Navbar from "./navbar/navbar";
import ConsentReceipt from "../components/consentReceipt/consentReceipt";
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./main/main";
export interface Props {}
export default function MainWrapper(props: Props) {
  return (
    <Router>
      <div className="Main">
        {/* <Navbar
        file={data}
        setPodName={setPodName}
        setShowSaveModal={setShowSaveModal}
        showSaveModal={showSaveModal}
      ></Navbar> */}
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:pod/:name" component={ConsentReceipt}></Route>
          <Route
            exact
            path="/:pod/:directory/:name"
            component={ConsentReceipt}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}
