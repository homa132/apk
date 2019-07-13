import React from 'react';
import {ActivityIndicator,StyleSheet,View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getMyData} from '../redux/actions';
import {connect} from 'react-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync(props);
  }

  _bootstrapAsync = async (props) => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    
    if(userToken){
      await props.getMyData();
    }

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {


    return (
      <View style={styles.conteiner}>
        <ActivityIndicator size="large" color="#11A1A1"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapDispatchToProps = (dispatch) => {
  return {
    getMyData: () => dispatch(getMyData())
  }
}

export default connect(null,mapDispatchToProps)(AuthLoadingScreen);