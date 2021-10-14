import React from "react";


import styled,{keyframes} from "styled-components";
import Auth from "../hoc/auth";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    
      
      
       
        <div class="card">
    <div class="card__content">

      <div class="frame"></div>
      <div class="card__front">
        <h3 class="card__title">Marauders</h3>
        <p class="card__subtitle">I Solemnly Swear That I Am Up To No Good</p>
      </div>

      <div class="card__back">
        <p class="card__body">
          organize your skill, schedule, idea and money
          for the better life.
        </p>

                <MoreDetail>
                <StyledLink  to="/about">
                more detail
                </StyledLink>
                </MoreDetail>
      </div>
        


    </div>
  </div>
      
    
  );
}
export default Auth(withRouter(LandingPage));

const MoreDetail = styled.div`
  background-color: transparent;
  transform: translateZ(2rem);
  border: 1px solid black;
  width: 100px;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    background-color: rgb(103,0,0);
    color:#D5C6AD;
    cursor: pointer;
  }
  `



const StyledLink = styled(Link)`
  
  text-decoration:none;
  color:black;
  
  &:hover{
    color:#D5C6AD;
  }
`