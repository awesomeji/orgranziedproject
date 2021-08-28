import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Index({indexStatus,setIndexStatus}) {
  return (
    <IndexContainer indexStatus={indexStatus} >
      <IndexButtons>
        <StyledLink to="/">HOME</StyledLink>
       
        <button onClick={()=>setIndexStatus(!indexStatus)} ><FontAwesomeIcon icon={faTimes}  /></button>
      </IndexButtons>
      <IndexWrapper><Link to="/calendar">Calendar</Link></IndexWrapper>
      <IndexWrapper>Blog</IndexWrapper>
      <IndexWrapper>Whatever</IndexWrapper>
      <IndexWrapper>Whatever</IndexWrapper>


      <IndexWrapper></IndexWrapper>
    </IndexContainer>
  )
}


const IndexWrapper = styled.div`
  font-size: 1.5rem;
  margin: 20px 0 0 10px;
  
`

const IndexContainer = styled.div`
position:fixed;
  top:0;
  left:0;
  width:20rem;
  height:100%;
  background: white;
  box-shadow: 2px 2px 50px gray;
  transform:${props => props.indexStatus ? 'translateX(0%)' : 'translateX(-100%)'};
 
  z-index: ${props => props.indextatus ? '0' : '2'};
  
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
`