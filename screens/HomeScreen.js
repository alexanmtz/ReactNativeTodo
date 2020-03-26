

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
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const Item = ({ text, done })=> {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{text}</Text>
      <Text>{ done ? 'Done' : 'Not done' }</Text>
    </View>
  );
}

const HomeScreen: () => React$Node = ({ navigation }) => {
  const [ getTodos, setTodos ] = useState([])
  const { getItem } = useAsyncStorage('@todo')

  const readItemFromStorage = async () => {
    //await AsyncStorage.removeItem('@todo');
    const item = await getItem();
    console.log(item)
    setTodos(JSON.parse(item))
  };
  
  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Todo</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>To do list</Text>
              <Text style={styles.sectionDescription}>
                Add new items on your to do list
              </Text>
            </View>
            {getItem &&
              <View style={styles.listContainer}>
                  <FlatList
                    data={getTodos}
                    renderItem={({ item }) => {
                      return (
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('TodoItem', { value: item.value, done: item.done}) }>
                          <View style={styles.sectionContainer}>
                            <Item text={item.value} done={item.done} />
                          </View>
                        </TouchableWithoutFeedback>
                      )
                    } }
                    keyExtractor={(item, index) => {
                      console.log('item', item, index)
                      'key' + index
                    }}
                  />
              </View> 
            }
            <View style={styles.button}>
              <Button
                title="Create an item"
                color={Colors.white}
                onPress={() => navigation.navigate('TodoItem')} />
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
  listContainer: {
    flex: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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

export default HomeScreen;