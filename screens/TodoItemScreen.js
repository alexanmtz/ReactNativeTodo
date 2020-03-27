

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-community/async-storage';
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

const mergeArrayObjects = (arr,obj) => {
  return arr.map((item,i)=> {
     if(item && item.id === obj.id){
         //merging two objects
       return obj
     } else {
       return item
     }
  })
}

const filterItem = (items, id) => {
  return items.filter(i => {
    return i.id !== id;
  });
}

const TodoItemScreen: () => React$Node = ({ route, navigation }) => {
  const params = route.params || { value: '', done: false}
  const [getTodos, setTodos] = useState([])
  const { getItem, setItem } = useAsyncStorage('@todo');
  const [ id ] = React.useState(params.id);
  const [ action ] = React.useState(params.action);
  const [value, onChangeText] = React.useState(params.value);
  const [isEnabled, setIsEnabled] = useState(params.done);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const readItemFromStorage = async () => {
    const item = await getItem();
    setTodos(item ? JSON.parse(item) : []);
  };

  const writeItemToStorage = async newValue => {
    await setItem(JSON.stringify(newValue));
    setTodos(newValue)
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const handleSave = async (evt) => {
    let updateItems;
    if(id) { 
      updateItems = mergeArrayObjects(getTodos, {id, value, done: isEnabled})
    } else {
      updateItems = [...getTodos, {id: getTodos.length + 1, value, done: isEnabled}]
    } 
    try {
      if(value) {
        await writeItemToStorage(updateItems)
        navigation.navigate('Home');
      } else {
        alert('Please fill your todo description')
      }
    } catch (e) {
      alert('Error to save your todo');
      console.log(e)
    }
  }

  const handleDelete = async (evt) => {
    try {
      const updateItems = filterItem(getTodos, id)
      await writeItemToStorage(updateItems)
      navigation.navigate('Home');
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
            <Text style={styles.headerTitle}>Todo Item {id}</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{ action } todo</Text>
              <Text style={styles.sectionDescription}>
                Please fill the information to {action} your todo
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <TextInput
                placeholder={'Description'}
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
                onPress={handleSave} />
            </View>
            {action === 'Update' &&
              <View style={[styles.button, styles.buttonDelete]}>
                <Button
                  title="Delete"
                  onPress={handleDelete} />
              </View>
            } 
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
    color: Colors.white,
    marginTop: 24,
    marginBottom: 24,
    padding: 12
  },
  buttonSave: {
    color: Colors.white,
    backgroundColor: Colors.dark
  },
  buttonDelete: {
    color: Colors.white,
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