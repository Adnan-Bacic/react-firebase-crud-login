import React, { useState } from 'react';
import { auth, firestore } from '../../firebase/config';

const Register = () => {

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [feedback, setFeedback] = useState('');

  const onChangeHandler = (e) => {
    //console.log(userInfo);
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try{
      //auth
      await auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);
      setFeedback('');
      //console.log('current user:', auth.currentUser);

      //firestore, set specific id equal to current user
      await firestore().collection('users').doc(auth().currentUser.uid).set({
        email: userInfo.email,
        name: userInfo.name
      });
    }
    catch(err){
      console.error('err:', err);
      setFeedback(err.message);
    }
  };

  return(
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
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
              <p className="text-danger font-weight-bold">{feedback}</p>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;