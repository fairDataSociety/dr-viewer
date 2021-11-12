import React, { useState } from "react";

import Navbar from "./navbar/navbar";
import Main from "./main/main";
import ConsentReceipt from '../components/consentReceipt/consentReceipt';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Route exact path='/'>
            <Main
            ></Main>
          </Route>
          <Route exact path='/:pod/:directory/:name' component={ConsentReceipt}>
          </Route>
        </Switch>
    </div>
    </Router>
  );
}
