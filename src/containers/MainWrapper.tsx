import React, { useContext, useState } from "react";

import Navbar from "./navbar/navbar";
import ConsentReceipt from "../components/consentReceipt/consentReceipt";
// @ts-ignore
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SessionContext from "../context/session";
import Login from "../components/login/login";
export interface Props {}
export default function MainWrapper(props: Props) {
  const { user } = useContext(SessionContext);

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
          <Route exact path="/login" component={Login} />
          <Route exact path="/:pod/:name" component={ConsentReceipt}></Route>
          <Route
            exact
            path="/:pod/:directory/:name"
            component={ConsentReceipt}
          ></Route>
          {!user && <Redirect to="/login" />}
        </Switch>
      </div>
    </Router>
  );
}
