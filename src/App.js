import {createElement, useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

const socket = io.connect('http://localhost:3001')

function App() {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState([])

  const [room, setRoom] = useState('')

  const sendMessage = () => {
    socket.emit('send-message', {message, room, own: true})
    console.log('message and room are:', message, room)
  }

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived((prev) => [...prev, data])
    })
    socket.on('show_message', (data, own) => {
      console.log('data is:', data)
      setMessageReceived((prev) => [...prev, {message: data, own: own}])
    })
  }, [socket])

  console.log('message received is: ', messageReceived)

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
      {messageReceived.map((msg) => {
        return msg.own ? (
          <h1
            key={uuidv4()}
            style={{backgroundColor: 'red', textAlign: 'right'}}
          >
            {msg.message}
          </h1>
        ) : (
          <h1 key={uuidv4()}>{msg}</h1>
        )
      })}
      {/* {message ? <h1 style={{backgroundColor: 'red'}}>{message}</h1> : ''} */}
    </div>
  )
}

export default App
