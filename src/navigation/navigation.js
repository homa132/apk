import React from 'react';
import MainFirst from '../pages/mainFirst';
import Account from '../pages/login';
import Add from '../pages/add';
import Likes from '../pages/likes';
import MainSecond from '../pages/mainSecond';
import Details from '../pages/details';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';


let history = [];

function navigation (props){

    switch (props.navigation.activeScreen){
        case 'MainFirst':
            history.push({name: 'MainFirst',screen: MainFirst });
            return (<MainFirst/>)
        case 'MainSecond':
                history.push({name: 'MainSecond',screen: MainSecond });
            return (<MainSecond/>)
        case 'Add':
                history.push({name: 'Add',screen: Add });
            return (<Add/>)
        case 'Likes':
                history.push({name: 'Likes',screen: Likes });
            return (<Likes/>)
        case 'Account':
                history.push({name: 'Account',screen: Account });
            return (<Account/>)
        case 'Details':
            return (<Details/>)
        case 'Back':
            let backIndex = history.length -1;
            let Back = history[backIndex];
            props.navigateTo(Back.name);
            return (<Back.screen/>)
    }
}

const mapStateToProps = (state) => {
    return {
      navigation: state.navigation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(navigation);