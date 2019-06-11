import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import NavBtn from '../navBtn/navBtn';


class Login extends Component{


    render(){
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <View style={styles.bottomNav}>
                    <NavBtn/>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
      }
})

export default connect()(Login);