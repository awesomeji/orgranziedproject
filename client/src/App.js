import React, { useState,Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';

import Nav from "./components/Nav";
import Index from "./components/Index";
import Calendar from "./components/calendar/Calendar";
import About from'./components/about/about'
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import CreatePage from './components/BlogPage/Sections/CreatePage'
import BlogPage from "./components/BlogPage/BlogPage";
import PostPage from "./components/PostPage/PostPage"

import "./styles/_app.scss";



function App() {
  //state
  const [indexStatus, setIndexStatus] = useState(false); // for open/close the index
  const [loginStatus, setLoginStatus] = useState(
    () => !!JSON.parse(localStorage.getItem("user"))
  );
 
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
   
      <Nav indexStatus={indexStatus} setIndexStatus={setIndexStatus}
          loginStatus={loginStatus} setLoginStatus={setLoginStatus} 
      />
      
      <Index indexStatus={indexStatus} setIndexStatus={setIndexStatus} />
     

      <Switch>
      <Route
        path="/login"
        render={props => <LoginPage {...props} setLoginStatus={setLoginStatus} />}
      />
      <Route  path="/blog/create" component={CreatePage} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/about" component={About} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/blog/post/:postId" component={PostPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/" component={LandingPage} />
      
    </Switch>
 
    </Suspense>
  );
}

export default App;