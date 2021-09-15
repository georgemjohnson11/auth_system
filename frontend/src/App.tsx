import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Layout from './hocs/Layout';
import store from './store';
import Login from './containers/auth/Login';
import Signup from './containers/auth/Signup';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Facebook from './containers/auth/Facebook';
import Google from './containers/auth/Google';
import { Provider } from 'react-redux';
import './App.css';
import LoggedInRoute from "./Routes/LoggedInRoute";
import LoggedOutRoute from "./Routes/LoggedOutRoute";

export default class App extends React.Component <{}> {
  render() {  return (
  <Provider store={store}>
    <Router>
      <Layout>
          <Switch>
            <LoggedOutRoute exact={true} path="/" component={Home} />
            <LoggedOutRoute exact={true} path='/login' component={Login} />
            <LoggedOutRoute exact={true} path='/register' component={Signup} />
            <LoggedOutRoute exact={true} path='/facebook' component={Facebook} />
            <LoggedOutRoute exact={true} path='/google' component={Google} />
            <LoggedOutRoute exact={true} path='/reset-password' component={ResetPassword} />
            <LoggedOutRoute exact={true} path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <LoggedOutRoute exact={true} path='/activate/:uid/:token' component={Activate} />
          </Switch>
      </Layout>
    </Router>
  </Provider>
  );
}
}