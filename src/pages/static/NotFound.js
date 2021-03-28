import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return(
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Page not found</h1>
          </div>
          <div className="col-12">
            <Link to={'/'}>Back to frontpage</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;