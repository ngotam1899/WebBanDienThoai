import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomePage from './src/components/HomePage';
import DetailPage from './src/components/DetailPage';
import CartPage from './src/components/CartPage';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import SignUpPage from './src/components/SignUpPage';
import SignInPage from './src/components/SignInPage';
import UserDetailPage from './src/components/UserDetailPage';
import CheckoutPage from './src/components/CheckoutPage';
import OrdersPage from './src/components/OrdersPage';
//Redux
import 'localstorage-polyfill';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';

const Tab = createBottomTabNavigator();
const store = configureStore();
import {createStackNavigator} from '@react-navigation/stack';
const HomeStack = createStackNavigator();
import {CartProvider} from './src/context/Cart';


function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomePage} />
      <HomeStack.Screen name="Detail" component={DetailPage} />
      <HomeStack.Screen name="Cart" component={CartPage} />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="SignUp" component={SignUpPage} />
      <HomeStack.Screen name="SignIn" component={SignInPage} />
      <HomeStack.Screen name="Checkout" component={CheckoutPage} />
      <HomeStack.Screen
        name="Orders"
        component={OrdersPage}
        options={{
          headerShown: true,
          title: 'TRANG ĐƠN HÀNG',
          headerStyle: {
            backgroundColor: '#1e88e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
      <HomeStack.Screen
        name="UserDetail"
        component={UserDetailPage}
        options={{
          headerShown: true,
          title: 'TRANG CÁ NHÂN',
          headerStyle: {
            backgroundColor: '#1e88e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

const App = () => {
  getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
  
    if (routeName === 'SignIn' || routeName === 'SignUp') {
      return false;
    }
    return true;
  };
  return (
    <Provider store={store}>
      <CartProvider>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: '#157cdb',
              inactiveTintColor: '#262626',
            }}>
            <Tab.Screen
              name="Home"
              component={HomeStackScreen}
              options={({route}) => ({
                tabBarVisible: this.getTabBarVisibility(route),
                tabBarLabel: 'Trang chủ',
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="home" size={26} color={color} />
                ),
              })}
            />
            <Tab.Screen
              name="Notification"
              component={NotificationScreen}
              options={{
                title: 'Thông báo',
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
      </CartProvider>
    </Provider>
  );
};
export default App;
