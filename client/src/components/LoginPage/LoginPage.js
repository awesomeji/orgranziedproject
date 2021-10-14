import React,{useState} from 'react'
import {Link} from 'react-router-dom'



import styled,{keyframes} from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!


import {useDispatch} from 'react-redux'
import { loginUser } from '../../_actions/user_action';
import {withRouter} from 'react-router-dom'

import Auth from '../hoc/auth'





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
        props.setLoginStatus(true)
       
       
      }else{
        alert('login failed')
      }
    })
  }

  return (<>
  

    <LoginContainer>
      <LoginForm onSubmit={onSubmitHandler}>
        <h1 style={{color:"rgb(0,0,0)",textShadow: "0px 0px 4px rgb(102, 100, 83)"}}>Login</h1>
        
        <input style={{backgroundColor:"rgba(170, 149, 106,0.5)",border:'2px solid rgb(0,0,0)'}} type="email" name="email" value={Email} onChange={onEmailHandler} placeholder="Email"/>
        <input style={{backgroundColor:"rgba(170, 149, 106,0.5)",border:'2px solid rgb(0,0,0)'}} type="password" name="password" value={Password} onChange={onPasswordHandler} placeholder="Password"/>
        <div className="buttonform">
        <button className="btn"type="submit">Sign in</button>
        <Link to="/register" ><button className="btn" >Sign up</button></Link>

        </div>
      </LoginForm>
      <Description>
        
       
        <JamesPotter><Title1>I solemnly swear that I am up to no good</Title1></JamesPotter>
        <SiriusBlack><Title1>I solemnly swear that I am up to no good</Title1></SiriusBlack> 
        <RemusLupin><Title1>I solemnly swear that I am up to no good</Title1></RemusLupin>
        <PeterPettigrew><Title2>I solemnly swear that I am up to no good</Title2></PeterPettigrew>
        
        </Description>
      
    </LoginContainer>
    </>
  )
}

export default Auth(withRouter(LoginPage));
const appear = keyframes`
from { opacity: 0; }
to { opacity: 0.5; }
`
const LoginContainer = styled.div`
  border: 1px solid rgb(0,0,0);
  height: 60vh;
  width: 70vw;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  transform: translate(20%,25%);
  border-radius: 2rem;
  
  `
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(0,0,0);
  height:100%;
  width: 40%;
  /* animation: ${appear} 1s ease-in-out; */
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
    background:rgb(103,0,0);
    color:#D5C6AD;
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
    
    overflow: hidden;
    padding-left: 10px;
    
`

const  JamesPotter = styled.div`
margin-top:150px;
 height:20%;
 transform:rotate(45deg);
 animation: ${appear} 2s ease-in-out;
 opacity: 0.5;
`
const  SiriusBlack = styled.div`
 animation: ${appear} 3.5s ease-in-out;
 
`
const  RemusLupin = styled.div`
height:20%;
margin-top:50px;
transform:rotate(135deg);
 animation: ${appear} 2.5s ease-in-out;
 opacity: 0.5;
`
const  PeterPettigrew = styled.div`
transform:rotate(45deg);
height:40%;

 animation: ${appear} 3s ease-in-out;
 
`

const Title1 = styled.h1`
  font-size: 2rem;
  
  text-shadow: 0px 0px 4px rgb(102, 100, 83);
`
const Title2 = styled.h1`
  font-size: 2rem;
  color: rgb(103,0,0);
  text-shadow: 0px 0px 4px rgb(102, 100, 83);

`