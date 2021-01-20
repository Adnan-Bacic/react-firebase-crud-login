import React from 'react';
import { BrowserRouter as RouterContainer, Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import EditItem from '../components/EditItem';
import UsersItem from '../components/UsersItem';

import About from './pages/About';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import ItemsByUser from './pages/ItemsByUser';

import Register from './pages/Register';
import Login from './pages/Login';

import Navbar from './includes/Navbar';
import Footer from './includes/Footer';

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
