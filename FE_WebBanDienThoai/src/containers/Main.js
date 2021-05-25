import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import MainRouters from '../components/MainRouters';

class Main extends Component {
  render() {
    const {history, location} = this.props;
    return (
      <>
      <HashRouter>
        <Header history={history} location={location}/>
        <MainRouters/>
      </HashRouter>
      <Footer/>
      </>
    );
  }
}
export default Main;