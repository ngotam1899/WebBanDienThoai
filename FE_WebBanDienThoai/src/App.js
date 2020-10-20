import React, { Component } from 'react';
import { Provider } from "react-redux";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './containers/Header';
import Footer from './containers/Footer';
import HomePage from './components/HomePage';

class App extends Component {
 render() {
  return (
    <>
    <Header/>
    <HomePage/>
    <Footer/>
    </>
  );
 }
}
export default App;
