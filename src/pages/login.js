import React,{Component} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { StackActions } from 'react-navigation';

class Login extends Component{

    _signOutAsync = async () => {
        await firebase.auth().signOut();
        await AsyncStorage.clear();
        StackActions.reset({
            index: 0,
            actions: [],
          });
        this.props.navigation.navigate('Auth');
      };

    render(){
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <Button
                title='sing out'
                onPress={this._signOutAsync}/>
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
})

export default connect()(Login);