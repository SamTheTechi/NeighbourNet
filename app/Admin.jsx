import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Text,
  View,
} from 'react-native';
import { FIREBASE_DB } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

const Drawer = createDrawerNavigator();

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.disc}>{item.disc}</Text>
      <Text style={styles.time}>Raised at {item.disc}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {
    const dataRef = collection(FIREBASE_DB, 'issue');

    const foo = onSnapshot(dataRef, {
      next: (snapshot) => {
        const arr = [];
        snapshot.docs.forEach((item) => {
          arr.push({
            id: item.id,
            ...item.data(),
          });
        });
        setAllIssues(arr);
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allIssues}
        renderItem={({ item }) => <Card item={item} />}
      />
    </SafeAreaView>
  );
};

const sendIssue = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Title'
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Description'
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Raise Issue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Admin = () => {
  return (
    <Drawer.Navigator initialRouteName='Client'>
      <Drawer.Screen name='Client' component={HomeScreen} />
      <Drawer.Screen name='Raise Issue' component={sendIssue} />
    </Drawer.Navigator>
  );
};

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
