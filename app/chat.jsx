import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Directions, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

const GenerativeChat = () => {
  const genAI = new GoogleGenerativeAI(
    `AIzaSyC4so2oRJ68fKM50hwDx3n7JBVEVLQgbm4`
  );
  const [input, setInput] = useState(``);
  const [msg, setMsg] = useState(``);
  const res = [];

  async function run() {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Great to meet you. What would you like to know?' }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.push(text);
  }
  useEffect(() => {
    run();
  }, [msg]);

  const handleSubmit = () => {
    setMsg(input);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {res.map((reaponse) => {
          return <Text>{reaponse}</Text>;
        })}
      </ScrollView>
      <View>
        <TextInput
          onChange={(text) => setInput(text)}
          style={styles.textInput}
          placeholder='Message AIChat..'
        />
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={handleSubmit}>
          <Text style={styles.touchableOpacityText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  scrollView: {
    flex: 0.9,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textInput: {
    flex: 0.8,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 8,
  },
  touchableOpacity: {
    flex: 0.2,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  touchableOpacityText: {
    color: '#ffffff',
  },
};
export default GenerativeChat;
