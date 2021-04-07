import React, { useEffect } from 'react';
import { BrowserRouter as RouterContainer, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/config';
import * as functions from '../redux/functions';
import * as Pages from '../pages';
import * as Includes from '../includes';
import * as Components from '../components';

const Router = () => {
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('auth().currentUser', auth().currentUser.email);
        functions.user.setUserData(auth().currentUser);
      } else {
        functions.user.signOutUser();
        console.warn('no user');
      }
    });
  }, [auth().currentUser]);

  const error = useSelector((state) => { return state.error; });
  useEffect(() => {
    // todo?
  }, [error.errorMessage]);

  return (
    <>
      <RouterContainer basename="/folders/react/react-firebase-crud-login/">
        <Includes.Navbar />
        {error.errorMessage && (
          <Components.Error />
        )}
        <Switch>
          <Route exact path="/" component={Pages.StartPage} />
          <Route path="/edit/:id" component={Pages.EditItem} />
          <Route exact path="/register" component={Pages.Register} />
          <Route exact path="/login" component={Pages.Login} />
          <Route exact path="/about" component={Pages.About} />
          <Route exact path="/profile" component={Pages.Profile} />
          <Route exact path="/users" component={Pages.Users} />
          <Route path="/user/:id" component={Pages.UsersItem} />
          <Route path="/items-by-user/:email" component={Pages.ItemsByUser} />
          <Route path="*" component={Pages.NotFound} />
        </Switch>
        <Includes.Footer />
      </RouterContainer>
    </>
  );
};

export default Router;
