import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StartProvider } from './context/startContext';
import { BoardProvider } from './context/boardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StartProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </StartProvider>
  </React.StrictMode>
);
