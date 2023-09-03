import {useEffect, useState} from 'react'
import {io} from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const [room, setRoom] = useState('')

  const sendMessage = () => {
    socket.emit('send-message', {message, room})
  }

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className='App'>
      <input
        type='text'
        placeholder='room number'
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>join Room</button>
      <br />
      <br />

      <input
        type='text'
        placeholder='message...'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <h3>
        <b>Message:</b>
      </h3>
      <h3>{messageReceived}</h3>
    </div>
  )
}

export default App
