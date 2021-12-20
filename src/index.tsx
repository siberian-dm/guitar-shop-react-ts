import App from './components/app/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, unwrapResult } from '@reduxjs/toolkit';
import { fetchGuitarsCardsAction } from './store/api-action';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore({
  reducer: rootReducer,
});

const fetchData = async () => {
  try {
    unwrapResult(await store.dispatch(fetchGuitarsCardsAction()));
  }
  catch (error) {
    const errorMessage = (error as {message: string}).message;
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }
};

fetchData();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
