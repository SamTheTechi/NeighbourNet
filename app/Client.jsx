import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FIREBASE_DB } from '../firebase.config';
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
import 'firebase/compat/auth';
import { addDoc, collection } from 'firebase/firestore';

const Drawer = createDrawerNavigator();

const Data = [
  {
    title: `Electricity`,
    time: `2`,
    disc: `Blackout at 2nd floor since 1AM`,
  },
  {
    title: `Water`,
    time: `6`,
    disc: `No supply since yesterday`,
  },
  {
    title: `Gas`,
    time: `11`,
    disc: `Gas pipeline leaking nearby weste gate`,
  },
  {
    title: `Ceiling`,
    time: `3`,
    disc: `Noo maintainance at room 26, Ceiling cracked since March 2024`,
  },
  {
    title: `Septic tank`,
    time: `13`,
    disc: `Septic tank overflowing, Needs cleaning`,
  },
  {
    title: `Electricity`,
    time: `4`,
    disc: `Low voltage since yesterday's thunderstorm`,
  },
];

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.disc}>- {item.disc}</Text>
      <Text style={styles.time}>Estd : {item.time} Hours</Text>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={Data} renderItem={({ item }) => <Card item={item} />} />
    </SafeAreaView>
  );
};

const sendIssue = () => {
  const [title, setTitle] = useState(``);
  const [disc, setDisc] = useState(``);

  const raise = async () => {
    try {
      await addDoc(collection(FIREBASE_DB, 'issue'), {
        title: title,
        disc: disc,
      });
      console.log('Issue raised successfully!');
    } catch (error) {
      console.error('Error raising issue:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Title'
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Description'
          onChangeText={(text) => setDisc(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={raise}>
          <Text style={styles.buttonText}>Raise Issue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Client = () => {
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
