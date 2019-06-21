import React from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SaveI from '../icon/btn/save.svg';

function SaveBtn(props){
    return (
        <TouchableOpacity onPress={()=>console.log('save')}>
            <SaveI/>
        </TouchableOpacity>
    )
}

export default connect()(SaveBtn);