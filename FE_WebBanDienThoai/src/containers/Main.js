import React, { Component, Fragment } from 'react';
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import MainRouters from '../components/MainRouters';

class Main extends Component {
 render() {
  return (
    <>
    <HashRouter>
      <Header/>
      <MainRouters/>
    </HashRouter>
    <Footer/>
    </>
  );
 }
}
export default Main;