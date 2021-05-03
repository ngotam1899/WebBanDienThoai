import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import {AppRegistry} from 'react-native';
//Redux
import {createStore, applyMiddleware} from 'redux';
import 'localstorage-polyfill';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import combineReducers from './src/redux/reducers/index';
import HomePage from './src/components/HomePage';
import DetailPage from './src/components/DetailPage';
const Tab = createBottomTabNavigator();
const store = configureStore();
import {createStackNavigator} from '@react-navigation/stack';
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <HomeStack.Screen name="Home" component={HomePage} />
      <HomeStack.Screen name="Detail" component={DetailPage} />
    </HomeStack.Navigator>
  );
}

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#157cdb',
          inactiveTintColor: '#262626',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="notifications" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Cá nhân',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="person" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);
/* sagaMiddleware.run(rootSaga); */

export default App;
