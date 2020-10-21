import React, { Component } from 'react';
import { Provider } from "react-redux";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './containers/Header';
import Footer from './containers/Footer';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

class App extends Component {
 render() {
  return (
    <>
    <Header/>
    <CheckoutPage/>
    <Footer/>
    </>
  );
 }
}
export default App;
