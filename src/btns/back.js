import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import BackI from '../icon/item/back.svg';

function Back (props) {

    return (
        <TouchableOpacity onPress={()=> props.state.navigation.goBack()}>
            <BackI/>
        </TouchableOpacity>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.navigation
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Back);