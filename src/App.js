import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';

const App = ({ currentUser }) => (
  <div className='wrapper'>
    <Header />
    <div className='content'>
      {!currentUser ? <Redirect to='/sign-in' /> : null}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route
          exact
          path='/sign-in'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInSignUpPage />
          }
        />
      </Switch>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(App);
