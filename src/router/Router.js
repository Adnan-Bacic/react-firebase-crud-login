import React, { useEffect } from 'react';
import { BrowserRouter as RouterContainer, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/config';
import * as functions from '../redux/functions';
import * as Pages from '../pages/index';
import * as Includes from '../includes';
import * as Components from '../components';

const Router = () => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        functions.user.setUserData(auth().currentUser);
      } else {
        functions.user.signOutUser();
      }
    });

    return unsubscribe;
  }, []);

  const error = useSelector((state) => { return state.error; });

  const routes = [
    { path: '/', component: Pages.StartPage, exact: true },
    { path: '/edit/:id', component: Pages.EditItem },
    { path: '/register', component: Pages.Register, exact: true },
    { path: '/login', component: Pages.Login, exact: true },
    { path: '/about', component: Pages.About, exact: true },
    { path: '/profile', component: Pages.Profile, exact: true },
    { path: '/users', component: Pages.Users, exact: true },
    { path: '/user/:id', component: Pages.UsersItem },
    { path: '/items-by-user/:email', component: Pages.ItemsByUser },
    { path: '/items-by-user-uid/:uid', component: Pages.ItemsByUserUid },
    { path: '*', component: Pages.NotFound },
  ];

  return (
    <RouterContainer basename="/folders/react/react-firebase-crud-login/">
      <Includes.Navbar />
      {error.errorMessage && (
        <Components.Error />
      )}
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
      <Includes.Footer />
    </RouterContainer>
  );
};

export default Router;
