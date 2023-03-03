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
          <Route exact path="/" component={ConsentReceipt} />
        </Switch>
      </div>
    </Router>
  );
}
