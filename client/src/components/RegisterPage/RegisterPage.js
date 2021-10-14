import React,{useState} from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../_actions/user_action'
import{withRouter} from 'react-router-dom'
import Auth from '../hoc/auth'
function RegisterPage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const dispatch = useDispatch();
const onEmailHandler= (e) =>{
  setEmail(e.currentTarget.value)
}
const onNameHandler= (e) =>{
  setName(e.currentTarget.value)
}
const onPasswordHandler= (e) =>{
  setPassword(e.currentTarget.value)
}
const onConfirmPasswordHandler= (e) =>{
  setConfirmPassword(e.currentTarget.value)
}

const onSubmitHandler = (e) => {
  e.preventDefault()

  if(password!==confirmPassword){
    return alert('confirm your password')
  }

  let body ={
    email: email,
    password:password,
    name:name
  }

  dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        props.history.push('/login')
      }else{
        alert('please fullfilled your info')
      }
    })
  
}
  
    return (
      <RegisterContainer>
        <RegisterForm onSubmit={onSubmitHandler} >
          <h1>Register</h1>
          <input type="email" name="email"  value={email}  onChange={onEmailHandler} placeholder="Email"/>
          <input type="text" name="name" value={name}  onChange={onNameHandler}placeholder="name"/>
          <input type="password" name="password" value={password} onChange={onPasswordHandler} placeholder="Password"/>
          <input type="password" name="confirmpassword" value={confirmPassword}  onChange={onConfirmPasswordHandler}placeholder="Confirmpassword"/>
          
          <div className="buttonform">
          <button className="btn" style={{border:'none'}}type="submit">I solemnly swear that I am up to no good</button>
  
          </div>
        </RegisterForm>
       
      </RegisterContainer>
    )
  }
  
  export default Auth(withRouter(RegisterPage))
  
  const RegisterContainer = styled.div`
   
    height: 80vh;
    
    width: 70vw;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    border-radius: 2rem;
    top: 0;
    left: 0;
    transform: translate(20%,10%);
    `
  const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    
    height:100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    .buttonform{
      width:50%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  
    button{
      border:1px solid black;
      margin-bottom:20px;
    }
    button:hover{
      background:rgb(103,0,0);
      color:#D5C6AD;
    }
    input{
      font-size: 1.5rem;
      padding: 0 0 0 10px;
      width:60%;
      -webkit-appearance: none;
      outline:none;
      background-color: #C7B699;
      border:none;
    }
  
    input:focus{
      border-bottom:2px solid black;
      box-shadow:0 5px 5px 0 black;
    }
    >*{
      margin:50px 0 0 0px;
  
    }
    h1{
      
    }
  `
  
