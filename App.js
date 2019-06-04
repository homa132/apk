import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Content from './src/test';
import reducer from './src/redux/reducers/reducer';
import { createStackNavigator,createAppContainer } from "react-navigation";

const store = createStore(reducer,applyMiddleware(ReduxThunk));

const screens = createStackNavigator({
  Test: Content
},{
  headerMode: 'none',
  mode: 'modal'
});

const Navigation =  createAppContainer(screens);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

