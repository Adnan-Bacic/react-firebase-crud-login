import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as functions from '../../redux/functions';
import { Spinner } from '../../components';

const AddItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title: '',
    subtitle: '',
    body: '',
  });

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
      setIsLoading(true);
      
      setIsLoading(false);
    };

    setLoading();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await functions.items.addItem(values.title, values.subtitle, values.body, user.userData.email);
    if (res === true) {
      history.go(0);
    }
  };

  return (
    <>
      {isLoading && !user.userData && (
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
      {!user?.userData && !isLoading && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>You must be logged in to create items</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddItem;
