import React from 'react';
import {Image} from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import mainFirst from '../pages/mainFirst';
import mainSecond from '../pages/mainSecond';
import Add from '../pages/add';
import Likes from '../pages/likes';
import Acc from '../pages/login';
import Details from '../pages/details';


const mapStack = createStackNavigator({
    MainFirst: mainFirst,
    Details: Details
},
{
    headerMode: 'none',
    mode: 'modal',
})

const AppNavigator = createBottomTabNavigator(
  {
    MainFirst: {
      screen: mapStack,
      navigationOptions: {
        tabBarIcon: ({focused})=> {
            return focused?<Image source={require('../icon/nav/MapIActive.png')}/>:<Image source={require('../icon/nav/MapI.png')}/>;
        }
      }
    },
    MainSecond: {
        screen: mainSecond,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?<Image source={require('../icon/nav/TopIActive.png')}/>:<Image source={require('../icon/nav/TopI.png')}/>;
            }
          }
      },
    Add: {
        screen: Add,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?<Image source={require('../icon/nav/AddIActive.png')}/>:<Image source={require('../icon/nav/AddI.png')}/>;
            }
          }
      },
    Likes: {
        screen: Likes,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?<Image source={require('../icon/nav/ChatIActive.png')}/>:<Image source={require('../icon/nav/ChaI.png')}/>;
            }
          }
      },
    Acc: {
        screen: Acc,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?<Image source={require('../icon/nav/AccIActive.png')}/>:<Image source={require('../icon/nav/AccI.png')}/>;
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