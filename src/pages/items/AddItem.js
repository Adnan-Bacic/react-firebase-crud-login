import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, firestore } from '../../firebase/config';
import * as functions from '../../redux/functions';
import { Spinner } from '../../components';

const AddItem = () => {
  const [values, setValues] = useState(null);

  const user = useSelector((state) => { return state.user; });

  const history = useHistory();

  const onChangeHandler = (text) => {
    const { value } = text.target;
    setValues({
      ...values,
      [text.target.name]: value,
    });
  };

  useEffect(() => {
    const setLoading = async () => {
      functions.isLoading.setIsLoading(true);
    
      functions.isLoading.setIsLoading(false);
    };

    setLoading();
  }, []);

  const isLoading = useSelector((state) => { return state.isLoading; });

  const submitHandler = async (e) => {
    e.preventDefault();
    await functions.items.addItem(values.title, values.subtitle, values.body, auth().currentUser.email);
    history.go(0);
  };

  return (
    <>
      {isLoading.isLoadingState && !auth().currentUser && (
        <Spinner />
      )}
      {user?.userData && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Add item</h2>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" value={values?.title} onChange={onChangeHandler} className="form-control" id="title" />
                </div>
                <div className="form-group">
                  <label htmlFor="subtitle">Subtitle</label>
                  <input type="text" name="subtitle" value={values?.subtitle} onChange={onChangeHandler} className="form-control" id="subtitle" />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <input type="text" name="body" value={values?.body} onChange={onChangeHandler} className="form-control" id="body" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            
            </div>
          </div>
        </div>
      )}
      {user?.userData && !isLoading.isLoadingState && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>You must be logged in to create items</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddItem;
