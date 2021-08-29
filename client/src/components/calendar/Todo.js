import React,{useContext,useRef,useState} from 'react'
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
      });
      
      localStorage.setItem("todoStore", JSON.stringify(state.externalEvents));
    
      setTitle("");
      setCustom("");
    }
  };

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
              <option value="select">select color</option>
              <option value="#34568B">dolphin</option>
              <option value="orange">tangerine</option>
              <option value="#88B04B">grass</option>
              <option value="#6B5B95">violet</option>
            </select>
            <button className="addtodo" type="submit"><FontAwesomeIcon icon={faPlusCircle}/> Add todo  </button>
          </form>
    </>
  )
}
