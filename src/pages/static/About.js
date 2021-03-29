import React from 'react';

const About = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>About</h1>
            <p>A React and Firebase application</p>
            <p>Signed in users can create items</p>
            <p>Users can only edit/delete their own items</p>
            <p>Made with React hooks and async/await syntax</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
