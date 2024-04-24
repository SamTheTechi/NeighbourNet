import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Text,
  View,
} from 'react-native';
const auth = FIREBASE_AUTH;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);

  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('client');
    } catch (e) {
      alert(`invalid cradential`);
    }
  };

  const admin = () => {
    navigation.replace('admin');
  };

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //     }
  //   });
  // });

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View>
        <Text style={styles.welcome}>Welcome Back!</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          autoCapitalize='none'
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button style={styles.button} title='Login' onPress={handleLogin} />
        <Button style={styles.button} title='Admin' onPress={admin} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  title: {
    paddingBottom: 5,
    fontSize: 25,
  },
  disc: {
    color: '#000000',
    fontSize: 15,
  },
  time: {
    textAlign: 'right',
    color: 'gray',
    fontSize: 15,
    paddingTop: 5,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  welcome: {
    marginBottom: 20,
    fontSize: 42,
  },
  button: {
    backgroundColor: '#419dff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
