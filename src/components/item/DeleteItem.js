import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { firestore, auth } from '../../firebase/config';

const DeleteItem = ({ id, createdBy }) => {
  const [feedback, setFeedback] = useState(null);

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      if (auth()?.currentUser?.email !== createdBy) {
        throw new Error('You cannot delete other peoples posts');
      }

      const ref = firestore().collection('items');
    
      await ref.doc(id).delete();
  
      window.location.reload();
    } catch (err) {
      setFeedback(err);
    }
  };

  return (
    <>
      <form onSubmit={deleteHandler}>
        <button type="submit" className="btn btn-danger">Delete</button>
      </form>
      {feedback && (
        <>
          <h2>{feedback.name}</h2>
          <p>{feedback.message}</p>
        </>
      )}
    </>
  );
};

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default DeleteItem;
