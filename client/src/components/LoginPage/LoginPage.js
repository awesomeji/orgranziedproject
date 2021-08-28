import React,{useState} from 'react'
import {Link} from 'react-router-dom'

import {  TextField } from "@material-ui/core";

import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import "bootswatch/dist/sketchy/bootstrap.min.css";

import {useDispatch} from 'react-redux'
import { loginUser } from '../../_actions/user_action';
import {withRouter} from 'react-router-dom'
import { PromiseProvider } from 'mongoose';




function LoginPage(props) {
  const dispatch= useDispatch();

  const[Email,setEmail]=useState("")
  const[Password,setPassword]=useState("")

  const onEmailHandler =(e) =>{
    setEmail(e.currentTarget.value)
  } 
  const onPasswordHandler =(e) =>{
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    console.log(Email);
    console.log(Password)

    let body={
      email: Email,
      password: Password
    }
dispatch(loginUser(body))
    .then(response=>{
      if(response.payload.loginSuccess){
        localStorage.setItem('user',response.payload.loginSuccess)
        props.history.push("/")
       console.log(props.parentNode)
       
       
      }else{
        alert('login failed')
      }
    })
  }

  return (<>
  

    <LoginContainer>
      <LoginForm onSubmit={onSubmitHandler}>
        <h1>Login</h1>
        <input type="email" name="email" value={Email} onChange={onEmailHandler} placeholder="Email"/>
        <input type="password" name="password" value={Password} onChange={onPasswordHandler} placeholder="Password"/>
        <div className="buttonform">
        <button className="btn"type="submit">Sign in</button>
        <Link to="/register" ><button className="btn" >Sign up</button></Link>

        </div>
      </LoginForm>
      <Description>This is description but it turns out signup form when user click sign-up</Description>
    </LoginContainer>
    </>
  )
}

export default withRouter(LoginPage)

const LoginContainer = styled.div`
  border: 1px solid black;
  height: 60vh;
  width: 70vw;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  transform: translate(20%,25%);
  `
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  height:100%;
  width: 40%;
  .buttonform{
    width:50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  button{
    border:1px solid black;
  }
  button:hover{
    background:black;
    color:white;
  }
  input{
    width:60%;
    height:5vh;
    -webkit-appearance: none;
    outline:none;
  }

  input:focus{
    border-bottom:2px solid black;
    box-shadow:0 5px 5px 0 black;
  }
  >*{
    margin:50px 0 0 60px;

  }
  h1{
    margin-top:80px;
  }
`

const Description = styled.div`
    width: 60%;

`