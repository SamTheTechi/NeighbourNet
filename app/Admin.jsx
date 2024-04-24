import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

const Tab = createBottomTabNavigator();

const Card = ({ item }) => {
  const handleRemoveIssue = () => {
    RemoveIssue(item.id);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.disc}>{item.disc}</Text>
      <Text style={styles.time}>Complaint Time: {item.time}</Text>
      <View style={styles.issues}>
        <TouchableOpacity style={styles.touchable} onPress={handleRemoveIssue}>
          <Text style={styles.touchabletextA}>Already resolved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          <Text style={styles.touchabletextB}> On to it </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RemoveIssue = async (issueId) => {
  try {
    await deleteDoc(doc(FIREBASE_DB, 'issue', issueId));
    alert('Issue successfully removed');
  } catch (error) {
    console.error(`Error removing issue with ID ${issueId}:`, error);
  }
};

const Issues = () => {
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {
    const dataRef = collection(FIREBASE_DB, 'issue');

    onSnapshot(dataRef, {
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
      {allIssues.length !== 0 ? (
        <FlatList
          data={allIssues}
          renderItem={({ item }) => <Card item={item} />}
        />
      ) : (
        <Text style={styles.nothing}>You're All Set!</Text>
      )}
    </SafeAreaView>
  );
};

const Community = () => {
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
    <Tab.Navigator initialRouteName='issues'>
      <Tab.Screen name='issues' component={Issues} />
      <Tab.Screen name='community' component={Community} />
    </Tab.Navigator>
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
    paddingBottom: 7,
    fontSize: 25,
  },
  disc: {
    color: '#000000',
    fontSize: 15,
    padding: 2,
  },
  time: {
    color: 'gray',
    fontSize: 15,
    padding: 5,
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
  issues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  touchable: {
    padding: 5,
  },
  touchabletextA: {
    fontSize: 18,
    paddingHorizontal: 10,
    padding: 4,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  touchabletextB: {
    fontSize: 18,
    paddingHorizontal: 30,
    padding: 4,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  nothing: {
    fontSize: 30,
    color: 'gray',
  },
});
