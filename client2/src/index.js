
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor ,store} from './redux/store'; // Make sure the path is correct
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App /></PersistGate>
    </Provider>

  </React.StrictMode>
);
