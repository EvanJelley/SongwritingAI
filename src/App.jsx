import { useState, memo } from 'react'
import './App.css'
import { OpenAI } from 'openai'


function App() {

  return (
    <>
      <img src={'./src/assets/musicBackground.png'} alt="Hiking" className='background-img' />
      <Navbar />
      <div className='row'>
        <div className='col-12 col-md-6'>
          <About />
        </div>
        <div className='col-12 col-md-6'>
        <Chatbot />
        </div>
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
      <div class="container d-flex justify-content-center">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <a class="nav-link" href="#">Home</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">About</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">Services</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">Contact</a>
              </li>
          </ul>
      </div>
  </nav>
    );
  };


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
      const botMessage = response.choices[0].message.content;

      // Add the bot's response to the chat
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
    }

    // Clear the input field
    setInput('');
  };

  function cleanMessage(message) {
    let formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<i>$1</i>');
    formattedMessage = formattedMessage.replace(/###(.*?)\n/g, '<b>$1</b>\n</br>');
    return { __html: formattedMessage };
  }

  function ideaHandler(idea) {
    setInput(idea);
    handleSend();
  }

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.length === 0 && <IdeaBubbleBay ideadHandler={ideaHandler} />}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className='message-content' dangerouslySetInnerHTML={cleanMessage(msg.text)}></div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Let's write a song together!"
      />
      <button className="submit-button" onClick={handleSend}>Send</button>
    </div>
  );
};

const IdeaBubbleBay = memo(({ ideadHandler }) => {
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
