import React from 'react';
import PropTypes from 'prop-types';
import { firestore, auth } from '../../firebase/config';

const DeleteItem = ({ id, createdBy }) => {

  const deleteHandler = async (e) => {
    e.preventDefault();

    try{
      if(auth()?.currentUser?.email === createdBy){
        const ref = firestore().collection('items');
    
        await ref.doc(id).delete();
  
        location.reload();
      } else {
        console.log('you cannot delete other peoples posts');
      }
    }
    catch(err){
      console.error('err:', err);
    }
    
  };

  return(
    <>
      <form onSubmit={deleteHandler}>
        <button className="btn btn-danger">Delete</button>
      </form>
    </>
  );
};

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired
};

export default DeleteItem;