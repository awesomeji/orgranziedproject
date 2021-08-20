
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { ThirdPartyDraggable,Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import "bootswatch/dist/sketchy/bootstrap.min.css";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { v4 as uuidv4 } from "uuid";
import Dragula from 'dragula';
import dragula from "dragula";


export default function Calender() {
  //state
  


  const dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { accepts: (el, target, source, sibling) => {return true} };
      Dragula([componentBackingInstance], options);
    }
  };

  dragula([document.querySelector('#external-events'), document.querySelector('#dumpster')])
  dragula([document.querySelector('#external-events'), document.querySelector('.fc-day')])
  

  const [color, setColor] = useState("");
  const [custom, setCustom] = useState("");
  const [title, setTitle] = useState("");
  const [state, setState] = useState({
    externalEvents: [],
  });

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
      setTitle("");
      setCustom("");
    }
  };

  const removeRemain = (info) =>{
    info.draggedEl.parentNode.removeChild(info.draggedEl);
    

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
          
          dayMaxEvents={true}
          droppable={true}
          drop= {removeRemain}
          editable={true}
          selectable={true}
          selectMirror={true}
          events={state.calendarEvents}
          eventResizableFromStart={true}
          eventDragStop={(info)=>{

            let trashEl = document.getElementById("dumpster");
            let x1 = trashEl.offsetLeft;
            let x2 = trashEl.offsetLeft + trashEl.offsetWidth;
            let y1 = trashEl.offsetTop;
            let y2 = trashEl.offsetTop + trashEl.offsetHeight;

            if (info.jsEvent.pageX >= x1 && info.jsEvent.pageX <= x2 &&
                info.jsEvent.pageY >= y1 && info.jsEvent.pageY <= y2) {
                    info.event.remove();
                    
            }
            
          }}
          // eventReceive={createCheckbox}
        />
        <div className="todo-container">
          <div className="todolist">
            <div className="dumpster" id="dumpster">
              dumpster
            </div>
            {/* todos */}
            <div  id="external-events" ref={dragulaDecorator}>
              {state.externalEvents.map((event) => (
                <div
                  
                  draggable={true}
                  className="fc-event trash"
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
          <form className="todoinput" onSubmit={addTodo}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add event"
            />
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="detail"
            />
            <select onChange={getColor} value={color}>
              <option value="select">--select color--</option>
              <option value="blue">blue</option>
              <option value="orange">orange</option>
              <option value="green">green</option>
              <option value="purple">purple</option>
            </select>
            <button type="submit">Add todo</button>
          </form>
        </div>
      </div>
  )
}
