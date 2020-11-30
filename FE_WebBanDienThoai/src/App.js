import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from './containers/Main'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import { Provider } from "react-redux";
import configureStore from "./redux/store";

const store = configureStore();

class App extends Component {
 render() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/user/dang-nhap" component={({history}) => <LoginPage history={history} />} exact/>
          <Route path="/user/dang-ky" component={RegisterPage} exact/>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
 }
}
export default App;
