import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './containers/Main'
import LoginPage from './components/LoginPage';

class App extends Component {
 render() {
  return (
    <>
    <BrowserRouter>
    <Switch>
        <Route path="/" component={Main} exact/>
        <Route path="/user/dang-nhap" component={LoginPage} exact/>
      </Switch>
      </BrowserRouter>
    </>
  );
 }
}
export default App;
