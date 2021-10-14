import React from "react";

import styled,{keyframes} from "styled-components";
import Auth from "../hoc/auth";
import { withRouter } from "react-router-dom";

function LandingPage() {
  return (
    <Landing>
      <Logo>
        <Title>marauders</Title>
       
      </Logo>
    </Landing>
  );
}
export default Auth(withRouter(LandingPage));

const appear = keyframes`
from { opacity: 0; }
to { opacity: 1; }
`
const Landing = styled.div`
  position: relative;
  height: 100vh;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  display: inline-block;
  
`;
const Title = styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
font-family: 'Dancing Script', cursive;
font-size: 15rem;
font-weight: 900;
color: rgb(0,0,0);
text-shadow: 0px 0px 4px rgb(102, 100, 83);
-webkit-mask-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png');
animation: ${appear} 3s ease-in-out;
`;
