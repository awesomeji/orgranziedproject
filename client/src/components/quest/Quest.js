import React,{useState} from 'react'
import Auth from '../hoc/auth'
import {withRouter} from 'react-router-dom'
import styled,{keyframes} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'

 function Quest() {
   const [questName,setQuestName]=useState('')
   const [questScale,setQuestScale]=useState('')
   const [showScale,setShowScale]=useState('')
   const [questReward,setQuestReward]=useState('')
   const [showDetail,setShowDetail]=useState(false)
   const [subQuest,setSubQuest]=useState([])
   const appendChildForm =(e) =>{
     e.preventDefault()
     console.log(questName)
     if(questName === "" || questScale === ""){
       alert("complete your form")

     }else{
       setShowDetail(true)
       setShowScale(questScale)
       setQuestName("")
       setQuestScale("")
     }
   }

  //  const CreateQuest =(e) =>{
  //   console.log(e)
  //  }
  return (
    <div>
      <h1>Quest는 현재 개발중입니다. 다른 기능을 먼저 이용해주시면 감사하겠습니다.</h1>
     <QuestContainer>
       <form onSubmit={appendChildForm}>
         <CreateQuest> 
           <CustomInput>
         <label>quest:</label>
        <input 
        style={{backgroundColor:'rgba(170, 149, 106,0.5)',textAlign:'center',WebkitAppearance:'none',border:'none',outline:'none',borderRadius:'0px',padding:'0px',margin:'0px',textShadow:'0px 0px 4px rgb(102, 100, 83)'}}
        type="text"
        value={questName}
        onChange={(e)=>setQuestName(e.target.value)}
        ></input>
        </CustomInput>
        <CustomInput>
        <label>Scale:</label>
        <input 
        style={{width:'100px',backgroundColor:'rgba(170, 149, 106,0.5)',textAlign:'center',WebkitAppearance:'none',border:'none',outline:'none',borderRadius:'0px',padding:'0px',margin:'0px',textShadow:'0px 0px 4px rgb(102, 100, 83)'}}
        value={questScale}
        onChange={(e)=>setQuestScale(e.target.value)}
        type="number" id="scale" name="scale" min="1" max="12"/>
        </CustomInput>
        
        
        <button
        style={{margin:"0 0 0 15px",WebkitAppearance:'none',border:'none',outline:'none',borderRadius:'0px',padding:'0px', backgroundColor: "rgba(170, 149, 106,0.5)"}}
        type="submit"
        ><FontAwesomeIcon size='3x' icon={faChevronCircleDown}/></button>
       </CreateQuest>
       </form>
      <QuestDetail showDetail={showDetail}>
        <StyledForm >
          {!isNaN(showScale) &&
              parseInt(showScale, 10) > 0 &&
              Array(parseInt(showScale, 10))
                .fill(0)
                .map((_, idx) => <SubQuest key={idx}>
                  <label>subquest: </label>
                  <input value={subQuest[idx]} onChange={(e)=> setSubQuest([...subQuest,e.target.value])} style={{backgroundColor:'rgba(170, 149, 106,0.5)',textAlign:'center',WebkitAppearance:'none',border:'5px double rgb(103,0,0)',outline:'none',borderRadius:'2rem',padding:'0px',margin:'0 0 0 5px',textShadow:'0px 0px 4px rgb(102, 100, 83)'}}/>
                </SubQuest>)}
                <ForReward>
        <label>reward:</label>
        <input
        style={{backgroundColor:'rgba(170, 149, 106,0.5)',textAlign:'center',width:'200px',WebkitAppearance:'none',border:'5px double rgb(103,0,0)',outline:'none',borderRadius:'2rem',padding:'0px',margin:'0 0 0 5px',textShadow:'0px 0px 4px rgb(102, 100, 83)'}}
        type="text"
        value={questReward}
        onChange={(e)=> setQuestReward(e.target.value)}
        
        />
        <button type="submit" 
        style={{margin:'0 0 0 20px'}}
        >quest register</button>
        </ForReward>
        <button>add subquest</button>
        </StyledForm>
      </QuestDetail>
     </QuestContainer>

    </div>
  )
}


export default Auth(withRouter(Quest),true);

const QuestContainer = styled.div`
  width:100vw;
  margin: 10px 0 0 0 ;
  display:flex;
  flex-direction:column;
`

const CreateQuest = styled.div`
  width:100vw;
  display:flex;
  flex-direction:row;
  justify-content:left;
  
`

const QuestDetail =styled.div`
width:100vw;
height: 50vh;

display:${props => props.showDetail ? 'flex' : 'none'};
flex-direction:column;

`

const CustomInput = styled.div`
  border:5px double black;
  border-radius: 2rem;
  height: 80px;
  padding: 15px;
  margin: 0 0 0 15px;
  font-size: 1.5rem;
  text-shadow: 0px 0px 4px rgb(102, 100, 83);

  
`
const SubQuest = styled.div`
  margin: 20px 0 0 15px;
  font-size: 1.5rem;
  text-shadow: 0px 0px 4px rgb(102, 100, 83);
  
`

const ForReward = styled(SubQuest)`
 margin: 30px 0 0 15px;
 display:flex;
 flex-direction:row;
  width: 35vw;
  border-top: 2px solid black;
  padding: 15px 0 0 0;

`

const StyledForm = styled.form`
height:50vh;
display:flex;
flex-direction:column;
flex-flow:column wrap;
`