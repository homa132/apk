import React from 'react';
import { createStackNavigator,createBottomTabNavigator } from "react-navigation";
import mainFirst from '../pages/mainFirst';
import mainSecond from '../pages/mainSecond';
import Add from '../pages/add';
import Likes from '../pages/likes';
import Acc from '../pages/login';
import Details from '../pages/details';

import MapI from '../icon/nav/map.svg';
import MapActiveI from '../icon/nav/mapActive.svg';
import TopI from '../icon/nav/top.svg';
import TopActiveI from '../icon/nav/topActive.svg';
import AddI from '../icon/nav/add.svg';
import AddActiveI from '../icon/nav/addActive.svg';
import ChatI from '../icon/nav/myLike.svg';
import ChatActiveI from '../icon/nav/myLikeActive.svg';
import AccI from '../icon/nav/accaunt.svg';
import AccActiveI from '../icon/nav/accauntActive.svg';

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
            return focused?(<MapActiveI/>):(<MapI/>);
        }
      }
    },
    MainSecond: {
        screen: mainSecond,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?(<TopActiveI/>):(<TopI/>);
            }
          }
      },
    Add: {
        screen: Add,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?(<AddActiveI/>):(<AddI/>);
            }
          }
      },
    Likes: {
        screen: Likes,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?(<ChatActiveI/>):(<ChatI/>);
            }
          }
      },
    Acc: {
        screen: Acc,
        navigationOptions: {
            tabBarIcon: ({focused})=> {
                return focused?(<AccActiveI/>):(<AccI/>);
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