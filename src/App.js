import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import { selectCurrentUser } from './redux/user/user.selectors';

import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import UsersPage from './pages/users/users.component';
import UserProfilePage from './pages/user-profile/user-profile.component';
import CompaniesPage from './pages/companies/companies.component';
import CompanyProfilePage from './pages/company-profile/company-profile.component';
import EditUserPage from './pages/edit-user/edit-user.component';
import EditCompanyPage from './pages/edit-company/edit-company.component';

const App = ({ currentUser }) => (
  <div className='wrapper'>
    <Header />
    <div className='content'>
      {!currentUser ? <Redirect to='/sign-in' /> : null}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/users' component={UsersPage} />
        <Route exact path='/users/:id' component={UserProfilePage} />
        <Route exact path='/users/:id/edit' component={EditUserPage} />
        <Route exact path='/companies' component={CompaniesPage} />
        <Route exact path='/companies/:id' component={CompanyProfilePage} />
        <Route exact path='/companies/:id/edit' component={EditCompanyPage} />
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
