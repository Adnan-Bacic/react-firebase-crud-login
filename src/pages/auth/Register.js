import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firestore } from '../../firebase/config';

const Register = () => {
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
      // auth
      await auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);
      // console.log('current user:', auth.currentUser);

      // firestore, set specific id equal to current user
      await firestore().collection('users').doc(auth().currentUser.uid).set({
        email: userInfo.email,
        name: userInfo.name,
      });

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
              {feedback && (
                <p className="text-danger font-weight-bold">{feedback}</p>
              )}
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
