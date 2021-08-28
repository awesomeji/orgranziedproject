import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Index from "./components/Index";
import Calendar from "./components/calendar/Calendar";
import About from'./components/about/about'
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import "./styles/_app.scss";
import Auth from "./components/hoc/auth";

function App() {
  //state
  const [indexStatus, setIndexStatus] = useState(false); // for open/close the index

  return (
    <>

      <Nav indexStatus={indexStatus} setIndexStatus={setIndexStatus} />
      
      <Index indexStatus={indexStatus} setIndexStatus={setIndexStatus} />

      <Switch>
        <Route exact path="/" component={Auth(LandingPage,null)}/>
        <Route exact path="/login" component={Auth(LoginPage,false)}/>
        <Route exact path="/calendar" component={Auth(Calendar,true)} />
        <Route exact path="/about" component={Auth(About,false)} />
        <Route exact path="/register" component={Auth(RegisterPage,false)}/>
      </Switch>
      
    </>
  );
}

export default App;
