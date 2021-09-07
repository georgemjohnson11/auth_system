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

export default class App extends React.Component <{}> {
  render() {  return (
  <Provider store={store}>
    <Router>
      <Layout>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Signup} />
            <Route exact path='/facebook' component={Facebook} />
            <Route exact path='/google' component={Google} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route exact path='/activate/:uid/:token' component={Activate} />
          </Switch>
      </Layout>
    </Router>
  </Provider>
  );
}
}