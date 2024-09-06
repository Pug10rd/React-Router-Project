import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/React-Router-Project">
      <Provider store={store}>
        <App />
        <ToastContainer position="bottom-right" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// !!! basename="/React-Router-Project"
