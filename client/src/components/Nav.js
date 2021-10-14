import React,{useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import styled,{keyframes} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faSignInAlt,faHatWizard } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import {useHistory} from 'react-router-dom'
import Title from "antd/lib/skeleton/Title";




 function Nav({indexStatus,setIndexStatus,loginStatus,setLoginStatus}) {
  console.log(typeof setLoginStatus)
 
  const logoutHandler =() =>{
    
    
    axios.get("/api/users/logout")
     .then(res=>{
       if(res.data.success){
         console.log(res)
        history.push('/login')
        localStorage.setItem('user','false')
        setLoginStatus(false); 
 
         
     }else{
         alert("Logout failed")
 
     }
   })
 }

 
  console.log()
 const history = useHistory();

  
 


  return (
    <>
    {loginStatus ===true ? (
      <div>
      <div className="nav">
        <h1 style={{color:"rgb(103,0,0)",textShadow: "0px 0px 4px rgb(102, 100, 83)",marginLeft:'10px'}} onClick={()=>setIndexStatus(!indexStatus)}> <FontAwesomeIcon icon={faHatWizard} /> Marauders</h1>
        <StyledLink1 to="/quest">
            <Title1>Quest</Title1></StyledLink1>
          <StyledLink1 to="/calendar">
            <Title1 >Calendar</Title1></StyledLink1>
          <StyledLink1 to="/blog/user">
            <Title1>Diary</Title1></StyledLink1>
          
          <StyledLink1 to="/">
            <Title1>Comin soon</Title1></StyledLink1>
        <div className="buttons">
          <button style={{border:'2px solid rgb(0, 0, 0)'}} onClick={logoutHandler}><Title2>Logout</Title2></button>

          <button style={{border:'2px solid rgb(0, 0, 0)'}} onClick={()=>setIndexStatus(!indexStatus)} ><Title2>menu</Title2></button>
        </div>
      </div>
    </div>)

    
    :
     ( <div>
      <div className="nav">
        <div style={{color:"rgb(0,0,0)",textShadow: "0px 0px 4px rgb(102, 100, 83)",marginLeft:'10px',fontSize:'2rem', }}  onClick={()=>setIndexStatus(!indexStatus)}><FontAwesomeIcon icon={faHatWizard} />   Marauders</div>
          <Basic>About</Basic>
          <Basic>How to use</Basic>
        <div className="buttons">
       

        <StyledLink2 to="/login">Login</StyledLink2>
        <StyledLink2 to="/register" >Sign Up</StyledLink2>
        
          
        </div>
      </div>
    </div>
    )}
    </>

    
    
 
  
   
   );
     }

export default Nav


const appear = keyframes`
from { opacity: 0; }
to { opacity: 1; }
`
const StyledLink1 = styled(Link)`
  font-size: 1.5rem;
  text-decoration:none;
  animation: ${appear} 1s ease-in-out;
  
`


const StyledLink2 = styled(Link)`
  padding: 10px 0 0 0 ;
  font-size:1.5rem;
  text-decoration:none;
  color: black;
  &:hover{
    color: rgb(103,0,0);
  }

`
const Basic = styled.div`
padding: 10px 0 0 0 ;
font-size:1.5rem;
animation: ${appear} 1s ease-in-out;

&:hover{
  color:#D5C6AD;
}
`

const Title1 = styled.h1`
color: rgb(0,0,0);
text-shadow: 0px 0px 4px rgb(102, 100, 83);
&:hover{
    color:#D5C6AD;
  }
`

const Title2 = styled.h1`
  font-size:1.5rem;
  color: rgb(0, 0, 0);
  text-shadow: 0px 0px 4px rgb(102, 100, 83);
  padding-bottom:10px;
  &:hover{
    color:#D5C6AD
  }

`