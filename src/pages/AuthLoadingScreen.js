import React from 'react';
import {ActivityIndicator,StyleSheet,View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {getMyData} from '../redux/actions';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    
    if(userToken){
      await firebase.firestore().collection('users').doc(userToken).get().then((doc) => {
        let data = doc.data();
        this.props.getMyData(data);
      })
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
    getMyData: (myDataAcc) => dispatch(getMyData(myDataAcc))
  }
}

export default connect(null,mapDispatchToProps)(AuthLoadingScreen);