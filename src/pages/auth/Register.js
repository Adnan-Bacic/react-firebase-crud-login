import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as functions from '../../redux/functions';

const Register = () => {
  const [userInfo, setUserInfo] = useState(null);

  const history = useHistory();

  const onChangeHandler = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await functions.user.registerUser(userInfo.email, userInfo.password, userInfo.name);
    if (res === true) {
      history.push('/');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Register</h1>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" onChange={onChangeHandler} className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" onChange={onChangeHandler} className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={onChangeHandler} className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
