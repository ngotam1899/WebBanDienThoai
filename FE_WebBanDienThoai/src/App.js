import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Main from './containers/Main'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import { Provider } from "react-redux";
import configureStore from "./redux/store";
import GlobalLoading from './containers/GlobalLoading';

const store = configureStore();

class App extends Component {
 render() {
  return (
    <Provider store={store}>
      <GlobalLoading/>
      <BrowserRouter>
        <Switch>
          <Route path="/" name="Trang chủ" component={Main} exact/>
          <Route path="/user/dang-nhap" name="Trang đăng nhập" component={({history}) => <LoginPage history={history} />} exact/>
          <Route path="/user/dang-ky" name="Trang đăng ký" component={RegisterPage} exact/>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
 }
}
export default App;
