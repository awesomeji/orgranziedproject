import React from "react";

export default function Nav({indexStatus,setIndexStatus}) {
  return (
    <div>
      <div className="nav">
        <h2>TITLE</h2>
        <div className="buttons">
          <button>Toggle</button>
          <button onClick={()=>setIndexStatus(!indexStatus)} >Index</button>
        </div>
      </div>
    </div>
  );
}
