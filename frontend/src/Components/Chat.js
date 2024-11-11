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
        return (
          <div key={index} className="mb-3">
            {/* Conditionally render messages from the user or others */}
            {user === data.author ? (
              <div className="d-flex justify-content-end">
                <div className="msg-container w-25 border border-2 border-dark bg-grey p-2">
                  <p className="author text-success">You</p>
                  <p className="msg">{data.message}</p>
                  <p className="time text-end">{data.time}</p>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-start">
                <div className="msg-container w-25 border border-2 border-dark bg-grey p-2">
                  <p className="author text-primary">{data.author}</p>
                  <p className="msg">{data.message}</p>
                  <p className="time text-end">{data.time}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <hr className="my-3 border border-2 border-dark" style={{ width: '100%' }} />
      <div className='footer'>
        <input style={{ width: '80%' }} type="text" placeholder='message...' value={message} onChange={(e) => setMessage(e.target.value)}></input>
        <button className="btn btn-success mb-3 px-4 mx-auto" onClick={() => sendMessage()}>Send</button>
      </div>
    </div>
  )
}
