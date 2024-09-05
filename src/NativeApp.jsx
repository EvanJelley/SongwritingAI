import React, { useState, memo } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

function NativeApp() {
  return (
    <ScrollView style={styles.container}>
      <Image source={require('./assets/musicBackground.png')} style={styles.backgroundImage} />
      <Navbar />
      <View style={styles.row}>
        <View style={styles.column}>
          <About />
        </View>
        <View style={styles.column}>
          <Chatbot />
        </View>
      </View>
    </ScrollView>
  );
}

const About = () => (
  <View>
    <Text style={styles.title}>Songwriting AI</Text>
    <Text>Let's write a song together! Type a message in the chat window to get started.</Text>
    <Text>Need some inspiration? Click on one of the idea bubbles below to get started.</Text>
    <Text>Powered by OpenAI's GPT-4 model.</Text>
    <Text>
      Created by{' '}
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/evan-jelley')}>
        Evan Jelley
      </Text>
    </Text>
    <Text>
      View the source code on{' '}
      <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/EvanJelley/SongwritingAI')}>
        GitHub
      </Text>
    </Text>
  </View>
);

const Navbar = () => (
  <View style={styles.navbar}>
    {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
      <TouchableOpacity key={index} style={styles.navItem}>
        <Text>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async (userInput) => {
    if (userInput.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: userInput }]);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are here to help songwriters." },
          { role: "user", content: userInput },
        ],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        }
      });

      const botMessage = response.data.choices[0].message.content;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput },
        { sender: 'bot', text: botMessage },
      ]);
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
    }
  };

  return (
    <View style={styles.chatbot}>
      <ScrollView style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.textBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => {
            handleSend(input);
            setInput('');
          }}
          placeholder="Let's write a song together!"
        />
        <Button title="Send" onPress={() => { handleSend(input); setInput(''); }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  column: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  navItem: {
    padding: 10,
  },
  chatbot: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 16,
  },
  chatWindow: {
    height: 300,
    marginBottom: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 4,
    borderRadius: 5,
  },
  textBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 5,
  },
});

export default NativeApp;
