import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './src/redux/reducers/reducer';
import { createAppContainer,createSwitchNavigator,createStackNavigator } from "react-navigation";
import StackNav from './src/navigation/stackNav';

import AuthLoadingScreen from './src/pages/AuthLoadingScreen';
import Auth from './src/pages/auth';
import Register from './src/pages/register';

const store = createStore(reducer,applyMiddleware(ReduxThunk));

const loginStack = createStackNavigator({
  Register: Register,
  Auth: Auth
},
{
  headerMode: 'none',
  mode: 'modal',
})

const Navigation =  createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: StackNav,
  Auth: loginStack,
},
{
  initialRouteName: 'AuthLoading',
}));

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