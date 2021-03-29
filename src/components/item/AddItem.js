import React, { useState } from 'react';
import { auth, firestore } from '../../firebase/config';

const AddItem = () => {
  const [values, setValues] = useState({
    title: '',
    subtitle: '',
    body: '',
  });

  const onChangeHandler = (text) => {
    const { value } = text.target;
    setValues({
      ...values,
      [text.target.name]: value,
    });
  };

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
      // TODO: ERROR
      console.error('err:', err);
    }
  };

  return (
    <>
      {auth().currentUser ? (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Add item</h2>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" value={values.title} onChange={onChangeHandler} className="form-control" id="title" />
                </div>
                <div className="form-group">
                  <label htmlFor="subtitle">Subtitle</label>
                  <input type="text" name="subtitle" value={values.subtitle} onChange={onChangeHandler} className="form-control" id="subtitle" />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <input type="text" name="body" value={values.body} onChange={onChangeHandler} className="form-control" id="body" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            
            </div>
          </div>
        </div>
      ) : (
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
