import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import BackI from '../icon/item/back.svg';
import {navigateTo} from '../redux/actions';

function Back (props) {

    return (
        <TouchableOpacity onPress={()=> props.navigateTo('Back')}>
            <BackI/>
        </TouchableOpacity>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
}

export default connect(null,mapDispatchToProps)(Back);