// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add the user's message to the chat
    setMessages([...messages, { sender: 'user', text: input }]);

    try {
      // Call the OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: input,
          max_tokens: 50,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      // Extract the chatbot's response
      const botMessage = response.data.choices[0].text.trim();
      
      // Add the bot's response to the chat
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
    }

    // Clear the input field
    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
