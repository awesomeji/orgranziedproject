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
        <h2  onClick={()=>setIndexStatus(!indexStatus)}><FontAwesomeIcon icon={faHatWizard} /> Marauders</h2>
          <StyledLink1 to="/calendar">
            <Title1>Calendar</Title1></StyledLink1>
          <StyledLink1 to="/blog/user">
            <Title1>Blog</Title1></StyledLink1>
          <StyledLink1 to="/">
            <Title1>Coming soon</Title1></StyledLink1>
          <StyledLink1 to="/">
            <Title1>Comin soon</Title1></StyledLink1>
        <div className="buttons">
          <button onClick={logoutHandler}><Title2>Logout</Title2></button>
          <button onClick={()=>setIndexStatus(!indexStatus)} ><Title2>menu</Title2></button>
        </div>
      </div>
    </div>)

    
    :
     ( <div>
      <div className="nav">
        <h2  onClick={()=>setIndexStatus(!indexStatus)}><FontAwesomeIcon icon={faHatWizard} />   Marauders</h2>
          <Basic>About</Basic>
          <Basic>How to use</Basic>
        <div className="buttons">
       

        <StyledLink2 to="/login"><FontAwesomeIcon icon={faSignInAlt} size="2x"/></StyledLink2>
        <StyledLink2 to="/register" ><FontAwesomeIcon icon={faUserPlus} size="2x"/></StyledLink2>
        
          
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
  
  text-decoration:none;
`
const Basic = styled.div`
font-size:1.5rem;
animation: ${appear} 1s ease-in-out;
`

const Title1 = styled.h1`

`

const Title2 = styled.h1`
  font-size:1rem;
`