import React from 'react';
import { useSelector } from 'react-redux';

const Error = () => {
  const error = useSelector((state) => { return state.error; });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger">
              {`${error.errorMessage.code}: ${error.errorMessage.message}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
