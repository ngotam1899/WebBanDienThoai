import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from './containers/Header';
import Footer from './containers/Footer';
import MainRoutes from './components/MainRouters'

class App extends Component {
 render() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <MainRoutes/>
    </BrowserRouter>
    <Footer/>
    </>
  );
 }
}
export default App;
