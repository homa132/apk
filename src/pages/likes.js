import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import NavBtn from '../navBtn/navBtn';


class Likes extends Component{


    render(){
        return (
            <View style={styles.container}>
                <Text>Likes</Text>
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

export default connect()(Likes);