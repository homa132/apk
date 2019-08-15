import React from 'react';
import {Image} from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import Main from '../pages/main';
import Top from '../pages/top';
import Add from '../pages/add';
import Chats from '../pages/chats';
import Acc from '../pages/login';
import Messenger from '../pages/messenger';
import DetailsUser from '../pages/detailsUser';
import Friends from '../pages/friends';

const mainStack = createStackNavigator({
    Main: Main,
    Messenger: Messenger,
    DetailsUser: DetailsUser,
    Friends: Friends
},
{
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'Main'
})


const topStack = createStackNavigator({
  Top: Top,
  DetailsUser: DetailsUser
},
{
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'Top'
})

const chatsStack = createStackNavigator({
  Chats: Chats,
  Messenger:Messenger,
  DetailsUserChat: DetailsUser,
  Friends: Friends,
  DetailsUser: DetailsUser,
},
{
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'Chats'
})

const AccStack = createStackNavigator({
  Acc: Acc,
  Friends: Friends
},
{
  headerMode: 'none',
  mode: 'modal',
})

const AppNavigator = createBottomTabNavigator(
  {

    Main: {
      screen: mainStack,
      navigationOptions: {
        tabBarIcon: ({focused})=> {
            return focused?<Image source={require('../img/nav/MapIActive.png')}/>:<Image source={require('../img/nav/MapI.png')}/>;
        }
      }
    },
    Top: {
      screen: topStack,
      navigationOptions: {
          tabBarIcon: ({focused})=> {
              return focused?<Image source={require('../img/nav/TopIActive.png')}/>:<Image source={require('../img/nav/TopI.png')}/>;
          }
        }
    },
    Add: {
      screen: Add,
      navigationOptions: {
          tabBarIcon: ({focused})=> {
              return focused?<Image source={require('../img/nav/AddIActive.png')}/>:<Image source={require('../img/nav/AddI.png')}/>;
          }
        }
    },
    Chats: {
      screen: chatsStack,
      navigationOptions: {
          tabBarIcon: ({focused})=> {
              return focused?<Image source={require('../img/nav/ChatIActive.png')}/>:<Image source={require('../img/nav/ChaI.png')}/>;
          }
        }
    },
    Acc: {
      screen: AccStack,
      navigationOptions: {
          tabBarIcon: ({focused})=> {
              return focused?<Image source={require('../img/nav/AccIActive.png')}/>:<Image source={require('../img/nav/AccI.png')}/>;
          }
        }
    },
  },{
    headerMode: 'none',
    mode: 'modal',
    tabBarOptions: {
        style: {
            backgroundColor: '#EAEAEA',
        },
    showIcon: true,
    showLabel: false,
    activeBackgroundColor: '#CBCBCB',
    }
  }
);


export default AppNavigator;