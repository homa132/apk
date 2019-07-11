import React from 'react';
import {Image} from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import main from '../pages/main';
import Top from '../pages/top';
import Add from '../pages/add';
import Likes from '../pages/likes';
import Acc from '../pages/login';
import Details from '../pages/details';
import Messenger from '../pages/messenger';
import DetailsUser from '../pages/detailsUser';

const mainStack = createStackNavigator({
    Main: main,
    Details: Details,
    Messenger:Messenger
},
{
    headerMode: 'none',
    mode: 'modal',
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
    activeBackgroundColor: '#CBCBCB',
    }
  }
);


export default AppNavigator;