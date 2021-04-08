import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as functions from '../../redux/functions';

const Error = () => {
  const error = useSelector((state) => { return state.error; });
  console.log('errorMessage', error.errorMessage);

  useEffect(() => {
    const clearError = async () => {
      if (error.errorMessage) {
        // temp solution?
        setTimeout(() => {
          functions.error.clearError();
        }, 10000);
      }
    };

    clearError();
  }, [error.errorMessage]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info">
              {`${error.errorMessage.code}: ${error.errorMessage.message}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
