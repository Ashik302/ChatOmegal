import io from "socket.io-client"
import './App.css';
import { useState } from "react";
import Chat from "./Components/Chat";

const socket = io.connect("http://localhost:3002")

function App() {

  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const joinRoom = () => {
    if(userName !=="" && room !== ""){
      socket.emit("join_room", room)
    }
    setShowChat(true)
  }




  return (
    <div className="App">
    {
      !showChat ? (
        <>
          <h3>
            join a chat
          </h3>
          <input
            type="text"
            placeholder="Ashik.."
            required
            onChange={(e) => setUserName(e.target.value)} />
          <br />
          <input
            type="text"
            placeholder="Room ID..."
            required
            onChange={(e) => setRoom(e.target.value)} />
          <br />
          <button className="btn" onClick={joinRoom} >join a room</button>
        </>
      ) : (
        <Chat
          socket={socket}
          username={userName}
          room={room}
        />
        )
      }
      </div>

  );
}

export default App;
