import React from 'react';
import { createStore } from 'redux';
import { Provider, } from "react-redux";
import { runningCharges } from './store/reducer';
import MainScreen from './components/MainScreen'

const store = createStore(runningCharges);

function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
