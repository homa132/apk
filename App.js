import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './src/redux/reducers/reducer';
import Navigator from './src/navigation/navigation';
import { createAppContainer } from "react-navigation";
import StackNav from './src/navigation/stackNav';

const store = createStore(reducer,applyMiddleware(ReduxThunk));
const Navigation =  createAppContainer(StackNav);

class App extends Component {
  render() {
    
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;