import "bootstrap/dist/css/bootstrap.min.css";
import io from "socket.io-client";
import "./App.css";
import { useState } from "react";
import Chat from "./Components/Chat";


const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const joinRoom = () => {
    if (name && room) {
      socket.emit("join-room", room)
      setIsLoggedIn(true)
    }

  }
  return (
    <div className="App ">
      {!isLoggedIn ? <div>
        <div className="user-container text-center">
          <h1 className="mb-5">Chat Web</h1>
          <input
            className="form-control mb-3 mx-auto"
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control mb-3 mx-auto"
            type="text"
            placeholder="room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="btn btn-primary px-4 mx-auto justify-content-center" onClick={joinRoom}>
            Join
          </button>
        </div>
      </div>
        :
        <Chat socket={socket} user={name} room={room}></Chat>
      }
    </div>
  );
}

export default App;
