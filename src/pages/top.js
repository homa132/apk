import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {  } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

class MainSecond extends Component{


    render(){

        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.headerConteiner}>
                        <Text>Лучшие</Text>
                        <View>
                            <TouchableOpacity>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%'
    }
})


export default connect()(MainSecond);