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
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import GenerativeChat from './chat';

const Drawer = createDrawerNavigator();

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.disc}>Status: {item.status}</Text>
      <Text style={styles.time}>Resolve Time: {item.time}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const [allResolve, setAllResolve] = useState([]);

  useEffect(() => {
    const dataRef = collection(FIREBASE_DB, 'resolve');
    onSnapshot(dataRef, {
      next: (snapshot) => {
        const arr = [];
        snapshot.docs.forEach((item) => {
          arr.push({
            id: item.id,
            ...item.data(),
          });
        });
        setAllResolve(arr);
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allResolve}
        renderItem={({ item }) => <Card item={item} />}
      />
    </SafeAreaView>
  );
};

const sendIssue = () => {
  const [title, setTitle] = useState(``);
  const [disc, setDisc] = useState(``);

  const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  const raise = async () => {
    try {
      await addDoc(collection(FIREBASE_DB, 'issue'), {
        title: title,
        disc: disc,
        time: utc,
        status: `Unresolved`,
      });
      setTitle(``);
      setDisc(``);
      alert(`issue raised`);
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
          style={styles.input2}
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

const Creaters = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Sameer Gupta</Text>
      <Text style={styles.welcome}>Hasan Dilshad</Text>
      <Text style={styles.welcome}>Shuatiksaham</Text>
    </View>
  );
};

export default Client = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Client'
      drawerStyle={{
        backgroundColor: '#fff',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'black',
        itemStyle: { marginVertical: 5 },
        labelStyle: { fontSize: 16 },
      }}>
      <Drawer.Screen name='Client' component={HomeScreen} />
      <Drawer.Screen name='Raise Issue' component={sendIssue} />
      {/* <Drawer.Screen name='AI chat' component={GenerativeChat} /> */}
      <Drawer.Screen name='Contributors' component={Creaters} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: 'black',
  },
  card: {
    margin: 10,
    padding: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  title: {
    textAlign: 'center',
    paddingBottom: 5,
    fontSize: 25,
  },
  disc: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 15,
  },
  time: {
    textAlign: 'right',
    color: '#717572',
    fontSize: 15,
    paddingTop: 5,
  },
  inputContainer: {
    width: '80%',
  },
  input2: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 15,
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
