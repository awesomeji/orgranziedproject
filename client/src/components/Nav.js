import React,{useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import {useHistory} from 'react-router-dom'




 function Nav({indexStatus,setIndexStatus,loginStatus,setLoginStatus}) {
  

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
        <h2>TITLE</h2>
        <div className="buttons">
          <div>About</div>
          <div>How to use</div>
          <button onClick={logoutHandler}>Logout</button>

        <StyledLink to="/login"><FontAwesomeIcon icon={faSignInAlt}/></StyledLink>
        
        
          <button onClick={()=>setIndexStatus(!indexStatus)} >Index</button>
        </div>
      </div>
    </div>)

    
    :
     ( <div>
      <div className="nav">
        <h2>TITLE</h2>
        <div className="buttons">
          <div>About</div>
          <div>How to use</div>
          <button onClick={logoutHandler}>Logout</button>

        <StyledLink to="/login"><FontAwesomeIcon icon={faSignInAlt}/></StyledLink>
        <StyledLink to="/register"><FontAwesomeIcon icon={faUserPlus}/></StyledLink>
        
          <button onClick={()=>setIndexStatus(!indexStatus)} >Index</button>
        </div>
      </div>
    </div>
    )}
    </>

    
    
 
  
   
   );
     }

export default Nav

const StyledLink = styled(Link)`
  margin-top:35px;
  text-decoration:none;
`
