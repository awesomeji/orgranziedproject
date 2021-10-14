import { set } from "mongoose";
import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";





export default function About() {
  
 const [trigger,setTrigger]=useState(false);
 const [secondTrigger,setSecondTrigger]=useState(false);
 const [thirdTrigger,setThirdTrigger]=useState(false);

  useEffect(()=>{
    setTrigger(true);
    if(trigger){
      setTimeout(()=>{
        setSecondTrigger(true);
      },500);
    }
    if(secondTrigger){
      setTimeout(()=>{
        setThirdTrigger(true);
      },2500);
    }
  })

  // Or Want to do organize yourself but don't know where to start?

  return (
 
   <DivContainer>
    <ToLeft trigger={trigger}>Have you ever felt like You really want to do start something new but you can't because your life is so messy? </ToLeft>
    <ToUp secondTrigger={secondTrigger}>Or Wanted to do organize yourself but don't know where to start?</ToUp>
    <Shazam>
      <Real>THEN IT'S TIME TO USE RIGHT TOOL.</Real>
      <FakeCover thirdTrigger={thirdTrigger}>div2</FakeCover>
    </Shazam>
      </DivContainer>
  
  );
}


const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: left;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  position:absolute;
  background:transparent;
`

const ToLeft = styled.div`
 width: 100%;
 
 transform:${props => props.trigger ? 'translateX(0%)' : 'translateX(110%)'};
 transition: all 1.5s ease;
 font-style: italic;
 font-weight: 900;
 font-size: 3rem;
`

const ToUp = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');
font-family: 'Open Sans Condensed', sans-serif;
font-size: 3rem;
width: 30%;
transform:${props => props.secondTrigger ? 'translateY(0%)' : 'translateY(10000%)'};
transition: all 2s ease;
letter-spacing: -4px;
font-weight:300;
position:relative;
z-index:2;
`

const Shazam = styled.div`
 width: 100%;
 
 
`

const FakeCover = styled.div`
 
 position:absolute;
 transform:${props => props.thirdTrigger ? 'translateX(110%)' : 'translateX(0%)'};
 transition: all 2.5s ease;
 font-size: 3rem;
  width: 100%;
  color: transparent;
  margin: 0 0 100px 0;
  background-color:#E3DACA;
  background-image: url("https://www.transparenttextures.com/patterns/light-wool.png");
  `

  const Real = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
  font-family: 'Permanent Marker', cursive;
  position:absolute;
  font-size: 3rem;
  font-weight:900;
  text-transform:uppercase;
  `