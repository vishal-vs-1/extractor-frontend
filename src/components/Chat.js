// Chat.js
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToBackend = async (userInput) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post("http://localhost:8080/chat", { message: String(userInput) });

      // Assuming the backend response contains a field `reply` with its content
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
      return "Sorry, I couldn't understand that.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    // Update UI immediately to reflect the user's message
    const userMessage = {
      id: Date.now(),
      user: "User1",
      text: trimmedMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(messages => [...messages, userMessage]);

    // Send message to backend and handle response
    const replyText = await sendMessageToBackend(trimmedMessage);
    const replyMessage = {
      id: Date.now() + 1, // Unique ID for the reply
      user: "Response",
      text: replyText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(messages => [...messages, replyMessage]);
    setNewMessage('');
  };

  return (
    <div className="absolute bottom-24 inset-x-0 px-4 pt-10 pb-5 sm:bottom-20s sm:right-4 sm:left-auto sm:h-96 sm:w-96  rounded-lg shadow-xl overflow-hidden"
      style={{
        background: darkMode ? '#1f2937' : '#fafcfa',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.6)'
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`p-2 ${message.user === 'User1' ? 'text-right' : 'text-left'}`}>
              <div className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}
              >{message.user}: {message.text}</div>              
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="mt-4 flex" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="flex-grow border rounded-lg p-2 text-sm"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            &#9654;
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
