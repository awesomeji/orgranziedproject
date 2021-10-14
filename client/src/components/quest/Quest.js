import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import Auth from '../hoc/auth'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import styled,{keyframes} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'
import {Progress} from 'antd'


 const subQuestValues={
   questName:'',
   subquest1:'',
   subquest2:'',
   subquest3:'',
   subquest4:'',
   subquest5:'',
   subquest6:'',
   subquest7:'',
   subquest8:'',
   subquest9:'',
   subquest10:'',
   subquest11:'',
   subquest12:'',
   reward:'',
   
}

 function Quest() {

   const user = useSelector(state=>state.user)  

   const [questName,setQuestName]=useState('')
   //set a basic scale here
   const [questScale,setQuestScale]=useState('')
  // and show it as input tags with showScale
   const [showScale,setShowScale]=useState('')
   //to open subquests
   const [showDetail,setShowDetail]=useState(false)
   //to send object to DB
   const [subQuest,setSubQuest]=useState(subQuestValues)

   

  const [questBar,setQuestBar]=useState([]) 

   const handleChange=(e)=>{
     const {name,value}=e.target;
     setSubQuest({...subQuest,[name]:value})}


   const appendChildForm =(e) =>{
     e.preventDefault()
     console.log(questName)
     if(questName === "" || questScale === ""){
       alert("complete your form")

     }else{
       setShowDetail(true)
       setShowScale(questScale)
       setSubQuest({...subQuest,questName:questName})
       
       setQuestScale("")
       
     }
   }

 const addSubquest=(e)=>{
   e.preventDefault()
   
   const sTon =parseInt(showScale)
    setShowScale(sTon+1)
    
 }

 const removeSubquest=(e)=>{
  e.preventDefault()
  
  const sTon =parseInt(showScale)
   setShowScale(sTon-1)
   
}

const questAddtoDB=(e)=>{
  e.preventDefault();
  console.log(subQuest)
  const removeBlank= Object.fromEntries(
    Object.entries(subQuest).filter(([key,value]) => value.length>0)
  )
  console.log(removeBlank)
  const questInfo ={
    quest: removeBlank,
    writer:user.userData._id,
    percent: 0,
  }
  console.log(questInfo)

  axios.post('/api/quest/create-quest',questInfo)
  setTimeout(()=>{
    window.location.reload()
  },100)
}

const increasePercent = (e,q) =>{
  

  console.log(e)
  console.log(q)
  const updateInfo = {questId:q._id,percent:(1/e.target.name)*100}
  console.log(updateInfo)
  axios.post('/api/quest/updatebar',updateInfo)
  .then(res=>{
    if(res.data.success){
      setTimeout(()=>{
        window.location.reload()
      },100)
    }
  })
 

}

useEffect(()=>{
if(!user.userData?._id) return;
const userId ={userId:user.userData._id}
console.log(userId)
axios.get('/api/quest/getQuests',userId)
.then(response=>{
  if(response.data.success){
    const questsInfo = response.data.quests;
    const fQuestsInfo = questsInfo.filter(index=>index.writer._id===user.userData._id)
    console.log(fQuestsInfo)
    setQuestBar(fQuestsInfo)
  } else{
    alert("Couldn't get quest list")
  }
})
},[user?.userData?._id])

  const renderQuest = questBar.map((q,index)=>{
    
    return <QuestBarContainer key={index}>
      <div style={{display:'flex',flexDirection:'column',fontSize:"1.5rem",padding:"10px 0 0 15px"}}>{q.quest.questName}</div>
      <form>
      <SubQuestBar>
      {
        Object.entries(q.quest).map(([key,value],i)=>{
          if(key.includes('subquest')){
            return <div> <input type="checkbox" onClick={(e)=>increasePercent(e,q)} name={Object.keys(q.quest).length-2} key={key} value={value}/> <label htmlFor={key}>{value}</label>
                  </div>
          }
        })
      }
      
      </SubQuestBar>
      <Progress style={{height:'40px'}} strokeColor='green' percent={q.percent>99.9 ? 100 : q.percent}/>
      </form>
      <RewardContainer>
      {q.percent>99.9 ? <span className="stamp is-approved">Approved</span> :<span className="stamp is-nope">Declined</span>  }
      <div style={{zIndex:1}}>
      <div >reward</div>
      <div style={{fontWeight:'900',fontSize:"2rem"}}>{q.quest.reward}</div>
      </div>
      </RewardContainer>
      </QuestBarContainer>
  })
  return (
    <div style={{height:'100vh'}}>
      
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
        <StyledForm onSubmit={(e)=>questAddtoDB(e)}>
          {!isNaN(showScale) &&
              parseInt(showScale, 10) > 0 &&
              Array(parseInt(showScale, 10))
                .fill(0)
                .map((_, idx) => <SubQuest key={idx}>
                  <label>subquest: </label>
                  <input name={`subquest${idx+1}`} value={subQuest[idx]}onChange={handleChange} style={{backgroundColor:'rgba(213, 198, 173,0.8)',textAlign:'center',WebkitAppearance:'none',border:'2px solid rgb(0,0,0)',outline:'none',borderRadius:'2rem',padding:'0px',margin:'0 0 0 5px'}}/>
                </SubQuest>)}
                <ForReward>
        <label>reward:</label>
        <input
        style={{backgroundColor:'rgba(213, 198, 173,0.8)',textAlign:'center',width:'200px',WebkitAppearance:'none',border:'2px solid rgb(103,0,0)',outline:'none',borderRadius:'2rem',padding:'0px',margin:'0 0 0 5px'}}
        type="text"
        name="reward"
        value={subQuest.reward}
        onChange={handleChange}
        
        />
        <StyledButton type="submit" 
        
        >register</StyledButton>
        {showScale<12 ?<StyledButton onClick={addSubquest}>add</StyledButton> : null}
        {showScale>1 ? <StyledButton onClick={removeSubquest}>substrack</StyledButton> : null}
        </ForReward>
        </StyledForm>
      </QuestDetail>
     </QuestContainer>
          <QuestBarFrame>{renderQuest}</QuestBarFrame>  
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
  border:2px solid black;
  border-radius: 2rem;
  height: 80px;
  padding: 15px;
  margin: 0 0 0 15px;
  font-size: 1.5rem;
  

  
`
const SubQuest = styled.div`
  margin: 20px 0 0 15px;
  font-size: 1.5rem;
 
  
`

const ForReward = styled(SubQuest)`
 margin: 30px 0 0 15px;
 display:flex;
 flex-direction:row;
  width: 45vw;
  border-top: 2px solid black;
  padding: 15px 0 0 0;

`

const StyledForm = styled.form`
height:50vh;
display:flex;
flex-direction:column;
flex-flow:column wrap;
`


const StyledButton = styled.button`
height: 50px;
width: 150px;
margin:0 0 0 20px;
-webkit-appearance: none;
outline: none;
border: 5px double rgb(0,0,0);
border-radius: 2rem;
background-color:rgba(170, 149, 106,0.5);

&:hover {
      background: rgb(103, 0, 0);
      color: rgb(0,0,0);
    }

`

const QuestBarFrame = styled.div`
  height:93vh;
  overflow:scroll;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
`

const QuestBarContainer = styled.div`
  border-radius:2rem;
  display:flex;
  width: 98vw;
  height:15vh;
  margin: 5vh 0 0 0;
  background-color: #983f38;
  background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
  flex-direction:row;
  justify-content:space-around;
  font-size:1.5rem;
  
  text-align:center;
  
  h1{
    padding:30px 0 0 25px;
  }
 
`

const SubQuestBar = styled.div`
 display:flex;
 justify-content:space-around;
 height:30%;
 border-bottom:2px solid black;
 

  flex-direction:row;
    width: 70vw;
    flex-wrap:nowrap;
  
 
 

`


const RewardContainer = styled.div`
 display:flex;
 flex-direction:column;
 width: 10vw;
 padding: 15px 10px 0 0;
 
 
`