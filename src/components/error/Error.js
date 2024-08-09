import React from 'react';
import { useSelector } from 'react-redux';
import * as functions from '../../redux/functions';

const Error = () => {
  const error = useSelector((state) => { return state.error; });

  const clearError = () => {
    functions.error.clearError();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="alert alert-danger alert-dismissible fade show">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={clearError}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h2>{error.errorMessage.name}</h2>
            <p>{`${error.errorMessage.code}: ${error.errorMessage.message}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
