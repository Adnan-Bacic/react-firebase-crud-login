import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import * as functions from '../../redux/functions';
import { firestore, auth } from '../../firebase/config';

const DeleteItem = ({ id, createdBy }) => {
  const history = useHistory();

  const deleteHandler = async (e) => {
    e.preventDefault();
    await functions.items.deleteItem(id, createdBy);
  
    history.go(0);
  };

  return (
    <>
      <form onSubmit={deleteHandler}>
        <button type="submit" className="btn btn-danger">Delete</button>
      </form>
    </>
  );
};

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default DeleteItem;
