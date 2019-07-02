import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions,ImageBackground,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {setTextDate} from '../redux/actions';


const { width, height } = Dimensions.get('window');


class Add extends Component{

    render(){
        
        return (
        <ImageBackground style={{width: '100%',height: '100%',padding: 0,margin: 0}} source={require('../img/background/background1.jpg')}>
            <View style={styles.container}>
                <Text>add</Text>
            </View>
        </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setTextDate: (name,value) => dispatch(setTextDate(name,value))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Add);