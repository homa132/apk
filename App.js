import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Content from './src/test';
import reducer from './src/redux/reducers/reducer';

const store = createStore(reducer,applyMiddleware(ReduxThunk));


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Content/>
      </Provider>
    );
  }
}

