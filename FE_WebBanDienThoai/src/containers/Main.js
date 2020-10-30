import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import MainRoutes from '../components/MainRouters'

class Main extends Component {
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
export default Main;