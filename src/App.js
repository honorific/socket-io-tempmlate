import {useEffect} from 'react'
import {io} from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function App() {
  const sendMessage = () => {
    socket.emit('send-message', {message: 'hello'})
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message)
    })
  }, [socket])
  return (
    <div className='App'>
      <input type='text' placeholder='message...' />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
