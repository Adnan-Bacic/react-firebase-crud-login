import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../../firebase/config';

const EditItem = ({ match }) => {
  const [specificItem, setSpecificItem] = useState({
    title: '',
    subtitle: '',
    body: '',
    createdBy: '',
  });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // console.log(match)
    const getOneItem = async () => {
      try {
        const ref = firestore().collection('items').doc(match.params.id);
    
        const doc = await ref.get();
  
        if (!doc.exists) {
          throw new Error('No item with this id');
        }

        setSpecificItem(doc.data());
      } catch (err) {
        setFeedback(err);
      }
    };

    getOneItem();
  }, [match.params.id]);

  const onChangeHandler = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    setSpecificItem({
      ...specificItem,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (auth()?.currentUser?.email !== specificItem.createdBy) {
        throw new Error('You cannot edit other peoples posts');
      }

      const ref = firestore().collection('items').doc(match.params.id);

      await ref.update({
        title: specificItem.title,
        subtitle: specificItem.subtitle,
        body: specificItem.body,
      });

      // TODO: ERROR HERE ONLINE
      window.location.reload();
    } catch (err) {
      setFeedback(err);
    }
  };

  return (
    <>
      {specificItem && (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="jumbotron mt-3">
                  <h1 className="display-4">{specificItem.title}</h1>
                  <p className="lead">{specificItem.subtitle}</p>
                  <hr className="my-4" />
                  <p>{specificItem.body}</p>
                  <hr />
                  <p>
                    Made by:
                    {specificItem.createdBy}
                  </p>
                  <p className="lead">
                    <Link to="/">Go back to frontpage</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <hr />
              </div>
            </div>
          </div>
          {auth()?.currentUser?.email === specificItem.createdBy && (
            <div className="container">
              <div className="row">
                <div className="col-12 mx-auto">
                  <h1>Edit item</h1>
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input type="text" name="title" value={specificItem.title} onChange={onChangeHandler} className="form-control" id="title" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subtitle">Subtitle</label>
                      <input type="text" name="subtitle" value={specificItem.subtitle} onChange={onChangeHandler} className="form-control" id="subtitle" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="body">Body</label>
                      <input type="text" name="body" value={specificItem.body} onChange={onChangeHandler} className="form-control" id="body" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p className="lead">
                      <Link to="/">Go back to frontpage</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {feedback && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{feedback.name}</h2>
              <p>{feedback.message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

EditItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default EditItem;
