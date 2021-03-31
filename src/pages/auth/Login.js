import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/config';

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const history = useHistory();

  const onChangeHandler = (e) => {
    // console.log(userInfo);
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

    try {
      await auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);

      history.push('/');
    } catch (err) {
      setFeedback(err.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" onChange={onChangeHandler} className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={onChangeHandler} className="form-control" id="password" />
              </div>
              {feedback && (
                <p className="text-danger font-weight-bold">{feedback}</p>
              )}
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
