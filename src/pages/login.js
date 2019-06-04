import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';

class Login extends Component{


    render(){
        return (
            <View>
                <Text>Login</Text>
            </View>
        )
    }
}

export default connect()(Login);