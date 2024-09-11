import React from 'react';
import PropTypes from 'prop-types';
import * as functions from '../../redux/functions';

const DeleteItem = ({ id, createdBy }) => {
  const deleteHandler = async (e) => {
    e.preventDefault();
    await functions.items.deleteItem(id, createdBy);
  };

  return (
    <form onSubmit={deleteHandler}>
      <button type="submit" className="btn btn-danger btn-block">Delete</button>
    </form>
  );
};

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};

export default DeleteItem;
