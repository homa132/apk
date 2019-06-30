import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo,setNavigation} from '../redux/actions';
import Messenger from '../btns/messenger';
import LikesDith from '../btns/likesDis';
const { width, height } = Dimensions.get('window');
import BackBtn from '../btns/back';

import CalendarI from '../icon/item/calendar.svg';
import TimeI from '../icon/item/time.svg';
import CategoryI from '../icon/item/category.svg';
import PeopleI from '../icon/item/people.svg';
import TelegrameI from '../icon/social/telegrame.svg';
import ViberI from '../icon/social/viber.svg';
import FacebookI from '../icon/social/facebook.svg';
import InstaI from '../icon/social/insta.svg';
import SiteI from '../icon/social/site.svg';
import CommentsI from '../icon/details/comments.svg';


class Details extends Component{

    changeItem = () => {
        const {navigation,data} = this.props.state;
        return data.testList.filter((item,index) => {
            return navigation.heshItem == item.hesh
        })
    }


    componentDidMount(){
        this.props.setNavigation(this.props.navigation)
    }

    render(){
        let item = this.changeItem();
        const {name,date,time,category,contacts,images,heshMessenger,textMore}  = item[0];

        return (
        <ImageBackground source={require('../img/background/background1.jpg')} style={{width: '100%', height: '100%'}}>
            
        </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen)),
        setNavigation: (nav) => dispatch(setNavigation(nav))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);