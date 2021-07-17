import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
import DrawerContent from './src/components/DrawerContent';
import ProductPage from './src/components/HomePage/ProductPage';
import SearchPage from './src/components/SearchPage';
import NotificationBottom from './src/components/NotificationBottom';
import RasaChat from './src/components/RasaChatPage/RasaChat';
import AccessoriesPage from './src/components/AccessoriesPage';
import AccProductPage from './src/components/AccProductPage';
import InstallmentPage from './src/components/InstallmentPage';
import UserInstallmentPage from './src/components/UserInstallmentPage';
import ComparePage from './src/components/ComparePage';
//Redux
import 'localstorage-polyfill';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';

const Tab = createBottomTabNavigator();
const store = configureStore();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

function HomeScreen({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        initialParams={{params: route.params}}
        component={HomePage}
      />
      <Drawer.Screen name="ProductPage" component={ProductPage} />
    </Drawer.Navigator>
  );
}
function AccProductTemp({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="AccProduct"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="AccProduct"
        component={AccProductPage}
        initialParams={{id: route.params.id}}
        options={{
          headerShown: true,
          title: 'TRANG PHỤ KIỆN',
          headerStyle: {
            backgroundColor: '#1e88e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: 65,
          },
        }}
      />
    </Drawer.Navigator>
  );
}
function HomeStackScreen({route, navigation}) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AccProductTemp"
        component={AccProductTemp}
        initialParams={{params: route.params}}
      />
      <HomeStack.Screen name="Detail" component={DetailPage} />
      <HomeStack.Screen name="Accessories" component={AccessoriesPage} />
      <HomeStack.Screen
        name="Cart"
        component={CartPage}
        options={{
          headerShown: true,
          title: 'TRANG GIỎ HÀNG',
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
        name="Installment"
        component={InstallmentPage}
        options={{
          headerShown: true,
          title: 'TRANG TRẢ GÓP',
          headerStyle: {
            backgroundColor: '#1e88e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: 100,
          },
        }}
      />
      <HomeStack.Screen name="Notification" component={NotificationScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="SignUp" component={SignUpPage} />
      <HomeStack.Screen name="SignIn" component={SignInPage} />
      <HomeStack.Screen name="Checkout" component={CheckoutPage} />
      <HomeStack.Screen name="AccProduct" component={AccProductPage} />
      <HomeStack.Screen
        name="Compare"
        component={ComparePage}
        options={{
          headerShown: true,
          title: 'TRANG SO SÁNH',
          headerStyle: {
            backgroundColor: '#1e88e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: 70,
          },
        }}
      />
      <HomeStack.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerShown: true,
          title: 'TRANG TÌM KIẾM',
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
        name="UserInstallment"
        component={UserInstallmentPage}
        options={{
          headerShown: true,
          title: 'TRANG QUẢN LÝ TRẢ GÓP',
          headerStyle: {
            backgroundColor: '#1e88e5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: 50,
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
            textAlign: 'center',
            marginLeft: -60,
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

class App extends Component {
  getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (routeName === 'SignIn' || routeName === 'SignUp') {
      return false;
    }
    return true;
  };
  render() {
    return (
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
                tabBarIcon: ({color}) => <NotificationBottom color={color} />,
              }}
            />
            <Tab.Screen
              name="Rasa"
              component={RasaChat}
              options={{
                tabBarLabel: 'Hỗ trợ',
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="message" size={26} color={color} />
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
  }
}

export default App;
