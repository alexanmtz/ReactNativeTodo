### React Native to do list
This is my initial implementation of a Todo List, with the following requirements
- Create todo items
- Mark items as done
- Edit description of an existing item
- Delete item from a list
- Plus delete all items from a list

This app was tested on IOS and Android. I did the setup without Expo, just because I have the IOS and Android environment working already

### What it would be the next steps:
- Create another list and select lists from collection of lists
- Move items from a list to another
- Syncronize lists and todo items between multiple devices
  For this functionality I would move the storage implementation to a component to handle the sync, from local, using SQLite or Async Storage to an API or using other store types like Redis
- Set deadline on any of my items and clearly see when an item is overdue

and more...

- I started the Jest tests but I had issues to mock React Native Navigation. Once we have the tests running, I would create a Circle CI build to run the tests

### Comments
- I decided to move forward with native components instead to use a UI Library
- I used Async Storage to persist the data, but we could use SQLite or connect to an simple API with authorization tokens set in environment variables

### Related projects
Checkout my open source project React Native Ready for learning with an example app: https://github.com/alexanmtz/react-native-ready

This app use Redux and a UI Library, and connects with a sample api.