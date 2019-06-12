import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import NavBtn from '../navBtn/navBtn';
import List from '../mainSecondItems/mainSecondItems';
const { width, height } = Dimensions.get('window');

class MainSecond extends Component{


    render(){

        return (
            <View style={styles.container}>
                <List/>
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
      },
    bottomNav: {
        position: 'absolute',
        bottom: 3,
        flexDirection: 'row',
      },

})

export default connect()(MainSecond);