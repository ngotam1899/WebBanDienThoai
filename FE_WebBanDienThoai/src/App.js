import React, { Component } from 'react';
import { Provider } from "react-redux";
import Header from './containers/Header';
import Footer from './containers/Footer';
import MainRoutes from './components/MainRouters'

class App extends Component {
 render() {
  return (
    <>
    <Header/>
    <MainRoutes/>
    <Footer/>
    </>
  );
 }
}
export default App;
