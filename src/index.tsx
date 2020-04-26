import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistedStore } from './store/';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './assets/styles/gloabalstyles';

import { History } from './services/history';
import Routes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <Router history={History}>
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} position="top-left" />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
