import { useState, memo } from 'react'
import './App.css'
import { OpenAI } from 'openai'
import Songwriter from './Songwriter.jsx'
import Sidebar from './SidebarNav.jsx'


const links = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Profile', href: '/profile', icon: '👤' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
  { label: 'Logout', href: '/logout', icon: '🚪' },
];

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <div className='row'>
      <Sidebar links={links}/>
          <Songwriter />
          <Chatbot />
      </div>
    </>
  )
}

const About = () => {
  return (
    <>
      <h1>Songwriting AI</h1>
      <p>Let's write a song together! Type a message in the chat window to get started.</p>
      <p>Need some inspiration? Click on one of the idea bubbles below to get started.</p>
      <p>Powered by OpenAI's GPT-4 model.</p>
      <p>Created by <a href="https://www.linkedin.com/in/evan-jelley" target="_blank">Evan Jelley</a></p>
      <p>View the source code on <a href="https://github.com/EvanJelley/SongwritingAI" target="_blank">GitHub</a></p>
    </>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
      <div className="container d-flex justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};


const Chatbot = () => {
  const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
  const [messages, setMessages] = useState([]);

  const handleSend = async (userInput) => {
    if (userInput.trim() === '') return;

    // Add the user's message to the chat
    setMessages([...messages, { sender: 'user', text: userInput }]);

    try {
      // Call the OpenAI API

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are here to help songwriters." },
          {
            role: "user",
            content: userInput,
          },
        ],
      });

      // Extract the chatbot's response
      const botMessage = response.choices[0].message.content;

      // Add the bot's response to the chat
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
    }
  };

  function cleanMessage(message) {
    let formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<i>$1</i>');
    formattedMessage = formattedMessage.replace(/###(.*?)\n/g, '<b>$1</b>\n</br>');
    return { __html: formattedMessage };
  }

  function ideaHandler(idea) {
    handleSend(idea);
  }

  return (
    <div className="chatbot">
      <div className="chat-window">
        <img src={'./src/assets/musicBackground.png'} alt="music" className='background-img-chat' />
        {messages.length === 0 && <IdeaBubbleBay handleIdea={ideaHandler} />}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className='message-content' dangerouslySetInnerHTML={cleanMessage(msg.text)}></div>
          </div>
        ))}
      </div>
      <TextBar handleSend={handleSend} />
    </div>
  );
};

const TextBar = ({ handleSend }) => {
  const [input, setInput] = useState('');
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend(input);
            setInput('');
          }
        }}
        placeholder="Let's write a song together!"
      />
      <button className="submit-button" id="submit-button" onClick={() => { handleSend(input); setInput(''); }}>Send</button>
    </>
  )
};

const IdeaBubbleBay = memo(({ handleIdea }) => {
  const ideasSpecific = [
    'What if we wrote a song about a journey to the moon?',
    'How about a song about a lost love?',
    'What if we wrote a song about a summer day at the beach?',
    'How about a song about a road trip across the country?',
    'What if we wrote a song about a magical forest?',
    'How about a song about a broken heart?',
    'What if we wrote a song about a new beginning?',
    'How about a song about a rainy day?',
    'What if we wrote a song about a secret garden?',
    'How about a song about a childhood memory?',
    'What if we wrote a song about love?',
    'How about a song about nature?',
    'What if we wrote a song about dreams?',
    'How about a song about hope?',
    'What if we wrote a song about friendship?',
    'How about a song about the stars?',
    'What if we wrote a song about the ocean?',
    'How about a song about the seasons?',
    'What if we wrote a song about time?',
    'How about a song about the universe?',
  ];

  const ideasGeneral = [
    'I need a chord progression for a song I am writing.',
    'I need help with writing lyrics for a song.',
    'I need help with writing a melody for a song.',
    'I need help with writing a bridge for a song.',
    'I need help with writing a chorus for a song.',
    'I need help with writing a verse for a song.',
    'I need help with writing a hook for a song.',
    'I need help with writing a pre-chorus for a song.',
    'I need help with writing a song title.',
    'I need help with writing a song intro.',
    'I need help with writing a song outro.',
    'I need help with writing a song structure.',
    'I need help with writing a song arrangement.',
    'I need help with writing a song form.',
    'I need help with writing a song concept.',
  ];

  const randomSpecificIdea1 = ideasSpecific[Math.floor(Math.random() * ideasSpecific.length)];
  const randomSpecificIdea2 = ideasSpecific[Math.floor(Math.random() * ideasSpecific.length)];
  const randomGeneralIdea1 = ideasGeneral[Math.floor(Math.random() * ideasGeneral.length)];
  const randomGeneralIdea2 = ideasGeneral[Math.floor(Math.random() * ideasGeneral.length)];

  return (
    <div className="idea-bubble-bay">
      <h2 className="idea-bubble-bay-title">Need some inspiration?</h2>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <ChatIdeaBubble idea={randomSpecificIdea1} ideadHandler={handleIdea} />
          <ChatIdeaBubble idea={randomSpecificIdea2} ideadHandler={handleIdea} />
        </div>
        <div className='col-12 col-md-6'>
          <ChatIdeaBubble idea={randomGeneralIdea1} ideadHandler={handleIdea} />
          <ChatIdeaBubble idea={randomGeneralIdea2} ideadHandler={handleIdea} />
        </div>
      </div>
    </div>
  );
});

const ChatIdeaBubble = ({ idea, ideadHandler }) => {
  return (
    <div className="chat-idea-bubble">
      <button className="idea-button" onClick={() => ideadHandler(idea)}>{idea}</button>
    </div>
  );
}


export default App
