import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';

class Messenger extends Component {

    render(){
        return (
            <View>
                <Text>Messenger</Text>
            </View>
        )
    }
}

export default connect()(Messenger);