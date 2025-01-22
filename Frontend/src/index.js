import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client`
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';

// Create a root and render your app
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure "root" matches your index.html

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
