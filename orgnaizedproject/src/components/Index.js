import React from 'react'

export default function Index({indexStatus}) {
  return (
    <div className={`index ${indexStatus ? 'active-index' : ''}`} >
      <h2>Index</h2>
      <div>Calendar</div>
      <div>Blog</div>
      <div>Whatever</div>
    </div>
  )
}
