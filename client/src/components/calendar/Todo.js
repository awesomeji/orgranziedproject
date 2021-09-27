import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'

import { v4 as uuidv4 } from "uuid";


export default function Todo({state,setState}) {

  
 
  
  const [color, setColor] = useState("");
  const [custom, setCustom] = useState("");
  const [title, setTitle] = useState("");

  const getColor = (e) => {
    setColor(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (title === "" || color === "") {
      alert("please type what to do or choose a color");
    } else {
      setState({
        externalEvents: [
          ...state.externalEvents,
          { title: title, color: color, custom: custom, id: uuidv4(), },
        ],
      },
      );
     
      
     
    
      setTitle("");
      setCustom("");
    }
  };

  const saveLocalTodos= () =>{
    localStorage.setItem("externalEvents",JSON.stringify(state.externalEvents));
  }
const getLocalTodos= () =>{
  if(localStorage.getItem("externalEvents")===null){
    localStorage.setItem("externalEvents",JSON.stringify([]))
  }else{
    let todolocal = JSON.parse(localStorage.getItem("externalEvents"));
    setState({externalEvents:todolocal});
  }
}
useEffect(()=>{
  getLocalTodos()
},[])
  useEffect(()=>{
   saveLocalTodos()
  },[state.externalEvents])

 
  return (
    <>
       <form className="todoinput" onSubmit={addTodo}>
            <input
              className="addevent"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add event"
            />
            <input
              className="detail"
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="detail"
            />
            <select className="selectcolor" onChange={getColor} value={color}>
              <option value="select">sorting hat</option>
              <option value="rgb(103,0,0)">Gryffindor</option>
              <option value="#24581E">Slytherin</option>
              <option value="#B9A02D">Hufflepuff</option>
              <option value="#062030">Ravenclaw</option>
            </select>
            <button className="addtodo" type="submit"><FontAwesomeIcon icon={faPlusCircle}/> Add todo  </button>
          </form>
    </>
  )
}


