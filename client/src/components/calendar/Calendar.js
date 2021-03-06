
import React, { useState, useEffect,useContext,createContext } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
// import the third-party stylesheets directly from your JS

import bootstrapPlugin from '@fullcalendar/bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpsterFire } from '@fortawesome/free-solid-svg-icons'
import styled,{keyframes} from 'styled-components';


import Auth from '../hoc/auth'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'

import axios from "axios";

import Todo from './Todo.js'





 function Calendar() {

  //state
  const [state, setState] = useState({
    externalEvents: [],
  });

  const user = useSelector(state=>state.user)  

  const [events, setEvents] = useState([])

  

  useEffect(() => {
    if (!user.userData?._id) return;
    const userId = {userId:user.userData._id};
    axios.get("/api/calendar/getEvents",userId)
    .then(res=>{
      //res.data.events.event가 내가 전송하고 싶은 값
      if(res.data.success){
        const eventsInfo =res.data.events;
        const fEventsInfo = eventsInfo.filter(
          index =>index.writer._id === user.userData._id
        )
        const eventOfFevents = fEventsInfo.map(e=>e.event)
        setEvents(eventOfFevents)
      }
    })
  },[user?.userData?._id])


  
  const removeRemain = (info) =>{
   
    info.draggedEl.parentNode.removeChild(info.draggedEl);
    
    //parse localstorage and find same text with draggedEl.innertext and delete match. and set to localstorage
    
    const localEx = JSON.parse(localStorage.getItem('externalEvents'))
    
    localEx.forEach((item,index)=>{
      if(item.title === info.draggedEl.innerText){
        localEx.splice(index,1)
        localStorage.setItem('externalEvents',JSON.stringify(localEx))
       
      }
    })
  }

  const removeFromDatabase = (e) =>{
    console.log(e)
    const eventId = e.event._def.publicId
    console.log(eventId)
    axios.post("/api/calendar/removeEvent",{eventId:eventId})
    .then(res=>{
      if(res.data.success){
       
      }
    }
    )
  }

  const handleEventAdd = (e) =>{
    console.log(e)
    //bring user info from redux
    console.log(e.event._def.publicId)
    const info ={
      event:e.event,
      writer:user.userData._id,
      event_id:e.event._def.publicId
    }
    axios.post('/api/calendar/create-event',info)
    
  }

  // const createCheckbox = (info) =>{
  //   let checkbox = document.querySelectorAll('.fc-daygrid-event')
  //   console.log(checkbox[0])
  //   if(info){
      
  //     checkbox.forEach(e => {
  //       if(e.hasAttribute('onClick')===true){
  //         return
  //       }else {
  //         e.setAttribute('onClick', 'checkTodo()')
  //       }
  //       }
  //     )
     
     
  //   }
  // }


 


  
   
  
  //actions

  
 

  useEffect(() => {
    
    

    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
       sticky: true,
      itemSelector: ".fc-event",
      mirrorSelector: ".fc-event",
      
      eventData: function (eventEl) {
        let id = eventEl.dataset.id;
        let title = eventEl.getAttribute("title");
        let color = eventEl.dataset.color;
        let custom = eventEl.dataset.custom;

        return {
          id: id,
          title: title,
          color: color,
          custom: custom,
          create: true,
        };
      },
    });
  }, []);
  return (
    <div className="calendar-container">
        <FullCalendar
          eventClassNames='checkbox'
          themeSystem="bootstrap"
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin,listPlugin,bootstrapPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          navLinks={true}
          weekNumbers={true}
          events={events}
          dayMaxEvents={true}
          droppable={true}
          drop= {removeRemain}
          editable={true}
          selectable={true}
          selectMirror={true}
          eventReceive={event => handleEventAdd(event)}
          eventResizableFromStart={true}
          eventDragStop={(info)=>{

            let trashEl = document.getElementById("dumpster");
            let x1 = trashEl.offsetLeft;
            let x2 = trashEl.offsetLeft + trashEl.offsetWidth;
            let y1 = trashEl.offsetTop;
            let y2 = trashEl.offsetTop + trashEl.offsetHeight;

            if (info.jsEvent.pageX >= x1 && info.jsEvent.pageX <= x2 &&
                info.jsEvent.pageY >= y1 && info.jsEvent.pageY <= y2) {
                    console.log(info)
                    console.log(info.event._def.publicId)
                    removeFromDatabase(info)
                    info.event.remove();

                    //info.event._def.publicId
                    //Events.event.id

            }
            
          }}  
          // eventReceive={createCheckbox}
        />
        
        <div className="todo-container">
          <div className="todolist">
            <div className="dumpster" droppable={true} id="dumpster">
                <FontAwesomeIcon icon={faDumpsterFire}/> dumpster
            </div>
            {/* todos */}
            <div  id="external-events"   >
              {state.externalEvents.map((event) => (
                <div
                  
                  draggable={true}
                  className="fc-event"
                  title={event.title}
                  data-id={event.id}
                  data-color={event.color}
                  data-custom={event.custom}
                  key={event.id}
                  style={{
                    backgroundColor: event.color,
                    borderColor: event.color,
                    cursor: "pointer",
                  }}
                  
                >
                 <div className="fc-event-main">
                <div>
                
                  <strong>{event.title}</strong>
                </div>
                {event.custom}
              </div>
                  
                </div>
              ))}
            </div>
            {/* todos */}
          </div>
                  <Todo state={state} setState={setState}
                  
                   />
        </div>
       
      </div>
  )
}

export default Auth(withRouter(Calendar),true);

const Title = styled.h1`

`