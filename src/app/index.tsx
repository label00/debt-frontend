import React from 'react';
import { Routing } from '../pages';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../entities';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
