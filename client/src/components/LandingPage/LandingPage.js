import React from "react";

import styled from "styled-components";
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
const Landing = styled.div`
  position: relative;
  height: 100vh;
`;

const Logo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -120%);
  display: inline-block;
`;
const Title = styled.h1`
font-size: 6rem;
color: rgb(0,0,0);
text-shadow: 0px 0px 4px rgb(102, 100, 83);
`;
