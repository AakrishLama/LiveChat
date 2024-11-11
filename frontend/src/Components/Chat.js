import React, { useState, useEffect } from 'react'


export default function Chat({ socket, user, room }) {
  const [message, setMessage] = useState("")
  const [msgList, setMsgList] = useState([])


  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: user,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send-message", messageData);
      setMsgList((msgList) => [...msgList, messageData]);
      setMessage("");
    }
  }
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMsgList((msgList) => [...msgList, data]);
    };

    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket])

  return (
    <div>
      <div className='header'></div>
      <h1>Welcome to Group {room}</h1>

      <div className='body'></div>
      {msgList.map((data, index) => {
        return (<div key={index}>
          {data.message}
        </div>)
      })}
      <div className='footer'>
        <input style={{ width: '80%' }} type="text" placeholder='message...' value={message} onChange={(e) => setMessage(e.target.value)}></input>
        <button className="btn btn-success mb-3 px-4 mx-auto" onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  )
}
