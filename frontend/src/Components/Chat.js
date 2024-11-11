import React from 'react'

export default function Chat() {
  return (
    <div>
      <div className='header'></div>
      <h1>Welcome to Group </h1>

      <div className='body'></div>
      <div className='footer'>
        <input style={{ width: '80%' }} type="text" placeholder='message...' ></input>
        <button className="btn btn-success mb-3 px-4 mx-auto">Send</button>
      </div>
    </div>
  )
}
