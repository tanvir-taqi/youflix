import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';

function App(): JSX.Element {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;