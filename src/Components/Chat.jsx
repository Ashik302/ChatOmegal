import React, { useEffect, useState } from 'react'

function Chat({ socket, username, room }) {
  const [currMessage, setCurrMessage] = useState("")
  const [MessageList, setMessageList] = useState([])
  const [user, setUser] = useState([])

  const sendMessage = async () => {
    if (currMessage !== "" || currMessage !== null) {
      const message = {
        room: room,
        author: username,
        message: currMessage,
        time:
          new Date(Date.now()).getHours()
          + ":" +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit("sent_message", message)
      setMessageList((prev) => [...prev, message])
      setCurrMessage("")
    }
  }

  useEffect(() => {
    const receiveHandler = (data) => {
      setMessageList((prevList) => [...prevList, data])
    }
    socket.on("receive_message", receiveHandler)

    return () => {
      socket.off("receive_message", receiveHandler)
    }

  }, [socket]);


  console.log(MessageList)
  return (
    <div className='container'>
      <div className="header">
        Live chat
      </div>
      <div className="body">
        <p className="users">
          {user.map((userName, index) => (
            <p key={index}>{userName}</p>
          ))}
        </p>
        {
          MessageList.map((messages, index) => {
            return (
              <div className="main" key={index}>
                <div className="mess">
                  <h5>{messages.message}</h5>
                </div>
                <div className="cont">
                  <p>{messages.author}</p>
                  <p>{messages.time}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <input
          type="text"
          placeholder='heyy...'
          value={currMessage}
          required
          onChange={(e) => setCurrMessage(e.target.value)} />
        <button className='btn' onClick={sendMessage}> &#8594; </button>
      </div>
    </div>
  )
}

export default Chat
