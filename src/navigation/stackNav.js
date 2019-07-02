import React from 'react';
import {Image} from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import mainFirst from '../pages/mainFirst';
import Top from '../pages/top';
import Add from '../pages/add';
import Likes from '../pages/likes';
import Acc from '../pages/login';
import Details from '../pages/details';
import Messenger from '../pages/messenger';

const mainStack = createStackNavigator({
    MainFirst: mainFirst,
    Details: Details,
    Messenger:Messenger
},
{
    headerMode: 'none',
    mode: 'modal',
})

const AppNavigator = createBottomTabNavigator(
  {
    MainFirst: {
      screen: mainStack,
      navigationOptions: {
        tabBarIcon: ({focused})=> {
            return focused?<Image source={require('../img/nav/MapIActive.png')}/>:<Image source={require('../img/nav/MapI.png')}/>;
        }
      }
    },
    MainSecond: {
        screen: Top,
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
    Likes: {
        screen: Likes,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?<Image source={require('../img/nav/ChatIActive.png')}/>:<Image source={require('../img/nav/ChaI.png')}/>;
            }
          }
      },
    Acc: {
        screen: Acc,
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
    activeBackgroundColor: '#CBCBCB'
    }
  }
);


export default AppNavigator;