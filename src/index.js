/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {/*
      <button
        type="button"
        onClick={() => {
          console.log('STORE', store.getState());
        }}
      >
        log redux store
      </button>
      */}
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
