import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { OpenAI } from 'openai'

function App() {

  return (
      <>
        <img src={'./src/assets/hiking.webp'} alt="Hiking" className='background-img' />
        <Chatbot />
      </>
  )
}

const Chatbot = () => {
  const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add the user's message to the chat
    setMessages([...messages, { sender: 'user', text: input }]);

    try {
      // Call the OpenAI API

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are here to help songwriters." },
          {
            role: "user",
            content: input,
          },
        ],
      });

      // Extract the chatbot's response
      console.log(response.choices[0].message);
      const botMessage = response.choices[0].message.content.trim();

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

export default App
