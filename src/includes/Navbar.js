import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as functions from '../redux/functions';

const Navbar = () => {
  const history = useHistory();

  const user = useSelector((state) => { return state.user; });

  const signOutHandler = async (e) => {
    e.preventDefault();
    await functions.user.signOutUser();
    history.push('/');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3" id="navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">React Firebase</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item text-light my-auto mr-2 font-weight-bold">
                {user.userData && (
                  <>
                    {`Email: ${user.userData.email}`}
                  </>
                )}
              </li>
              {user.userData && (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-light">Profile</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/users" className="nav-link text-light">Users</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-light">About</Link>
              </li>
              {!user.userData && (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link text-light">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-light">Login</Link>
                  </li>
                </>
              )}
              {user.userData && (
                <li className="nav-item text-light my-auto mr-2">
                  <form onSubmit={signOutHandler}>
                    <button type="submit" className="btn btn-danger">Log out</button>
                  </form>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
