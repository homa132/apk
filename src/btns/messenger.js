import React from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';

import Mess from '../icon/item/Messanger.svg';

function Messenger (props) {

    messanger = () => {
        props.navigateTo('Messenger');
    }

    return (
        <TouchableOpacity style={styles.btnMessConteiner}
                onPress={messanger}>
                <Mess/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnMessConteiner: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
  }

export default connect(null,mapDispatchToProps)(Messenger);