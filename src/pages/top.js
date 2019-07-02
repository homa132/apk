import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions} from 'react-native';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');

class MainSecond extends Component{


    render(){

        return (
            <View style={styles.container}>
                <Text>Top event</Text>
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
})


export default connect()(MainSecond);