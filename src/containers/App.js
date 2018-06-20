import React, { Component } from 'react';
import {render} from 'react-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import Table from './Table';
import { createStore, compose } from 'redux';

const reducer = combineReducers(reducers);

const createStoreInit = compose(createStore);
const store = createStoreInit(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Table />
      </Provider>
    );
  }
}

export default App;
