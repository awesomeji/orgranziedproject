import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Index({indexStatus,setIndexStatus}) {
  return (
    <IndexContainer indexStatus={indexStatus} >
      <IndexButtons>
        <StyledLink style={{textDecoration:'none',color:'black'}} to="/">HOME</StyledLink>
       
        <button onClick={()=>setIndexStatus(!indexStatus)} ><FontAwesomeIcon icon={faTimes}  /></button>
      </IndexButtons>
      <IndexWrapper><FLink to="/quest">Quest</FLink></IndexWrapper>
      <IndexWrapper><FLink to="/calendar">Calendar</FLink></IndexWrapper>
      <IndexWrapper><FLink to="/blog/user">Diary</FLink></IndexWrapper>
      <IndexWrapper>Coming up</IndexWrapper>


      <IndexWrapper></IndexWrapper>
    </IndexContainer>
  )
}


const IndexWrapper = styled.div`
  font-size: 1.5rem;
  margin: 20px 0 0 10px;
  -webkit-appearance: none;
  display:flex;
   &:hover{
    background-color: rgb(103,0,0);
    color:white;
  }
  
`

const IndexContainer = styled.div`
position:fixed;
  top:0;
  left:0;
  width:12rem;
  height:100%;
  background-color: #8E8375;
  background-image: url("https://www.transparenttextures.com/patterns/gplay.png");
  box-shadow: 2px 2px 50px #8E8375;
  transform:${props => props.indexStatus ? 'translateX(0%)' : 'translateX(-110%)'};
 
  z-index: ${props => props.indextatus ? '0' : '3'};
  
  transition: all 0.5s ease;
  h2{
    padding: 2rem;
  }
`

const IndexButtons = styled.div`
  display:flex;
  width:100%;
  height:10%;
  
  justify-content: space-around;
  button{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background:transparent;
  }
  &:first-child{
    font-size: 2rem;
    
  }
`
const StyledLink = styled(Link)`
  margin-top:35px;
  text-decoration:none;
  color:black;
  

`

const FLink =styled(Link)`
  width:100%;
  text-decoration:none;
  color:black;
  flex: 1;
  &:hover{
    color:#D5C6AD
  }
  `