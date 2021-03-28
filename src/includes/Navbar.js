import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const checkUserAuthState = () => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('auth().currentUser', auth().currentUser);
          setLoggedInUser(auth().currentUser);
        } else {
          console.warn('no user');
          setLoggedInUser(null);
        }
      });
    };
    checkUserAuthState();
  }, []);

  const signOutHandler = async () => {
    try{
      await auth().signOut();
      console.log('current user:', auth.currentUser);
    }
    catch(err){
      console.error('err:', err);
    }
  };

  return(
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3" id="navbar">
          <div className="container-fluid">
            <Link to='/' className="navbar-brand">React Firebase</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item text-light my-auto mr-2">
                  {loggedInUser && loggedInUser.email}
                </li>
                <li className="nav-item">
                  <Link to='/users' className="nav-link text-light">Users</Link>
                </li>
                {!auth().currentUser && (
                  <>
                    <li className="nav-item">
                      <Link to='/register' className="nav-link text-light">Register</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/login' className="nav-link text-light">Login</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link to='/about' className="nav-link text-light">About</Link>
                </li>
                {auth().currentUser && (
                  <>
                    <li className="nav-item">
                      <Link to='/profile' className="nav-link text-light">Profile</Link>
                    </li>
                  </>
                )}
                {auth().currentUser && (
                  <>
                    <li className="nav-item text-light my-auto mr-2">
                      <button onClick={signOutHandler} className="btn btn-danger">Log out</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;