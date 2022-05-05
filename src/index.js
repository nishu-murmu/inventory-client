import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

let root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <ColorModeScript />
    <Routes>
        <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
