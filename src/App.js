import {useEffect, useState} from 'react'
import {io} from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const sendMessage = () => {
    socket.emit('send-message', {message})
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
        placeholder='message...'
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <span>
        <b>Message:</b>
      </span>
      <span>{messageReceived}</span>
    </div>
  )
}

export default App
