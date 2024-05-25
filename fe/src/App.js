import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonInput from './Components/Tombol';

function App() {
  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState(null);
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/message', { message });
      setResponse(`Message created with ID: ${res.data.id}`);
      setMessages(prevMessages => ({ ...prevMessages, [res.data.id]: res.data.message }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGet = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/message/${messageId}`);
      setResponse(`Message with ID ${messageId}: ${res.data.message}`);
    } catch (err) {
      setResponse(`Error: ${err.response.data.error}`);
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/message/${messageId}`, { message });
      setResponse(`Message with ID ${messageId} updated to: ${res.data.message}`);
      setMessages(prevMessages => ({ ...prevMessages, [messageId]: res.data.message }));
    } catch (err) {
      setResponse(`Error: ${err.response.data.error}`);
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/message/${messageId}`);
      setResponse(`Message with ID ${messageId} deleted`);
      setMessages(prevMessages => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageId];
        return newMessages;
      });
    } catch (err) {
      setResponse(`Error: ${err.response.data.error}`);
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Enter your message" 
          />
          <ButtonInput type="submit" color="success" name="Send"/>
        </form>
        <div>
          <input 
            type="number" 
            value={messageId} 
            onChange={(e) => setMessageId(e.target.value)} 
            placeholder="Enter message ID" 
          />
          <ButtonInput className="m-2"  onClick={handleGet} color="primary" name="Get"/>
          <ButtonInput  onClick={handleUpdate} color="warning" name="Update"/>
          <ButtonInput  onClick={handleDelete} color="danger" name="Delete"/>
        </div>
        {response && <p>Response: {response}</p>}
        <ul>
          {Object.keys(messages).map(id => (
            <li key={id}>{`ID: ${id}, Message: ${messages[id]}`}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
