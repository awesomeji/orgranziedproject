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
import {DataProvider} from './components/calendar/DataProvider'

function App() {
  //state
  const [indexStatus, setIndexStatus] = useState(false); // for open/close the index
  const [loginStatus, setLoginStatus] = useState(
    () => !!JSON.parse(localStorage.getItem("user")),
  );
  
  return (
    <>
      <DataProvider>
      <Nav indexStatus={indexStatus} setIndexStatus={setIndexStatus}
          loginStatus={loginStatus} setLoginStatus={setLoginStatus} 
      />
      
      <Index indexStatus={indexStatus} setIndexStatus={setIndexStatus} />

      <Switch>
        <Route exact path="/" component={Auth(LandingPage,null)}/>
        
        <Route path="/login"><LoginPage setLoginStatus={setLoginStatus}/></Route>
        <Route exact path="/calendar" component={Auth(Calendar,true)} />
        <Route exact path="/about" component={Auth(About,false)} />
        <Route exact path="/register" component={Auth(RegisterPage,false)}/>
      </Switch>
      </DataProvider>
    </>
  );
}

export default App;
