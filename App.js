import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './src/redux/reducers/reducer';
import Navigator from './src/navigation/navigation';

const store = createStore(reducer,applyMiddleware(ReduxThunk));


class App extends Component {
  render() {
    
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;