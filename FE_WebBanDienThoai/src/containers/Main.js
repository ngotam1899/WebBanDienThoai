import React, { Component } from 'react';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import MainRoutes from '../components/MainRouters'

class Main extends Component {
 render() {
  return (
    <>
    <HashRouter>
      <Header/>
      <MainRoutes/>
    </HashRouter>
    <Footer/>
    </>
  );
 }
}
export default Main;