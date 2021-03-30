import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth, firestore } from '../../firebase/config';
import * as functions from '../../redux/functions';
import { Spinner } from '../../components';

const AddItem = () => {
  const [values, setValues] = useState(null);

  const onChangeHandler = (text) => {
    const { value } = text.target;
    setValues({
      ...values,
      [text.target.name]: value,
    });
  };

  useEffect(() => {
    functions.isLoading.setIsLoading(true);
    
    functions.isLoading.setIsLoading(false);
  }, []);

  const isLoading = useSelector((state) => { return state.isLoading; });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const ref = firestore().collection('items');

      await ref.add({
        title: values.title,
        subtitle: values.subtitle,
        body: values.body,
        createdBy: auth().currentUser.email,
      });

      window.location.reload();
    } catch (err) {
      // TODO: ERROR HANDLING
      console.error('err:', err);
    }
  };

  return (
    <>
      {isLoading.isLoadingState && !auth().currentUser && (
        <Spinner />
      )}
      {auth().currentUser && (
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
      {!auth().currentUser && !isLoading.isLoadingState && (
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
