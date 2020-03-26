

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useState, useEffect } from 'react';
import AsyncStorage, { useAsyncStorage } from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Switch
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const TodoItemScreen: () => React$Node = ({ route, navigation }) => {
  const params = route.params || { value: '', done: false}
  const [getTodos, setTodos] = useState([])
  const { getItem, setItem } = useAsyncStorage('@todo');
  const [id, setId] = React.useState(params.id); 
  const [value, onChangeText] = React.useState(params.value);
  const [isEnabled, setIsEnabled] = useState(params.done);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setTodos(JSON.parse(item));
  };

  const writeItemToStorage = async newValue => {
    await setItem(newValue);
    setTodos(newValue)
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const handleSave = async (evt) => {
    try {
      await writeItemToStorage(JSON.stringify([{id, value, done: isEnabled}]))
      navigation.push('Home');
    } catch (e) {
      alert('Error to save your todo');
      console.log(e)
    }
  }

  const handleDelete = async (evt) => {
    try {
      await AsyncStorage.removeItem('@todo');
      navigation.push('Home');
    } catch (e) {
      alert('Error to save your todo');
      console.log(e)
    }
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Todo Item</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Create / Edit todo</Text>
              <Text style={styles.sectionDescription}>
                Please fill the information to ediv / save your todo
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <TextInput
                placeholder={'Title'}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
              />
              <Text>Mark as done</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={[styles.button, styles.buttonSave]}>
              <Button
                title="Save"
                color={Colors.white}
                onPress={handleSave} />
            </View>
            <View style={[styles.button, styles.buttonDelete]}>
              <Button
                title="Delete"
                color={Colors.dark}
                onPress={handleDelete} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 24
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: '600',
    color: Colors.black
  },
  body: {
    backgroundColor: Colors.white,
  },
  checkboxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  button: {
    backgroundColor: Colors.dark,
    marginTop: 24,
    marginBottom: 24,
    padding: 12
  },
  buttonSave: {
    backgroundColor: Colors.dark
  },
  buttonDelete: {
    backgroundColor: Colors.white
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default TodoItemScreen;