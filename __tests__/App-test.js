/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer, { create } from 'react-test-renderer';

global.fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('react-native-gesture-handler', () => jest.fn);
//jest.mock('@react-navigation/stack', () => jest.fn)
jest.mock('@react-navigation/stack', () => {
  return {
      createAppContainer: jest.fn().mockReturnValue(function NavigationContainer(props) {return null;}),
      createDrawerNavigator: jest.fn(),
      createMaterialTopTabNavigator: jest.fn(),
      createStackNavigator: jest.fn().mockReturnValue(function Stack(props) {return null;}),
      StackActions: {
          push: jest.fn().mockImplementation(x => ({...x,  "type": "Navigation/PUSH"})),
          replace: jest.fn().mockImplementation(x => ({...x,  "type": "Navigation/REPLACE"})),
      },
      NavigationActions: {
          navigate: jest.fn().mockImplementation(x => x),
      }
  }
});

it('renders correctly', () => {
  renderer.create(<App />);
});
