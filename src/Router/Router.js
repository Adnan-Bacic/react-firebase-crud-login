import React from 'react';
import { BrowserRouter as RouterContainer, Switch, Route } from 'react-router-dom';

import Index from '../pages/Index';
import EditItem from '../components/item/EditItem';
import UsersItem from '../components/user/UsersItem';

import About from '../pages/static/About';
import Profile from '../pages/user/Profile';
import NotFound from '../pages/static/NotFound';
import Users from '../pages/user/Users';
import ItemsByUser from '../pages/items/ItemsByUser';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

import Navbar from '../includes/Navbar';
import Footer from '../includes/Footer';

const Router = () => {
  return (
    <>
      <RouterContainer basename="/folders/react/react-firebase-crud-login/">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/edit/:id" component={EditItem} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/users" component={Users} />
          <Route path="/user/:id" component={UsersItem} />
          <Route path="/items-by-user/:email" component={ItemsByUser} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </RouterContainer>
    </>
  );
};

export default Router;
