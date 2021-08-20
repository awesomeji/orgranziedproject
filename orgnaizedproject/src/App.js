import React,{useState} from 'react'
;

import Nav from "./components/Nav";
import Index from "./components/Index";
import Calender from './components/Calender';
import "./styles/_app.scss"
function App() {
  //state
  const [indexStatus, setIndexStatus] = useState(false); // for open/close the index
 

  return (
    <div className="App">
      <Nav indexStatus={indexStatus} setIndexStatus={setIndexStatus} />

      <Calender />

      <Index indexStatus={indexStatus} />
    </div>
  );
}

export default App;
