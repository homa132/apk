import React, {Component} from 'react';
import {StyleSheet, Text, View,Button,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {getData} from './redux/actions'
import firebase from 'react-native-firebase';

class App extends Component {
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('data');
  }

  componentDidMount() {
    this.SearchData();
  }

  SearchData(){
    let data = [];
    this.unsubscribe = this.ref.onSnapshot((newData) => {
      newData.forEach(item => {
        data.push(item.data());
      })
    });
    this.props.getData(data);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    console.log(this.props.state);
    
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Button
          title='data'/>
        </ScrollView>
        <View style={styles.bottomNav}>
          <Button
          title='main'/>
          <Button
          title='second'/>
        </View>
      </View>
    );
  }

}




const mapStateToProps = (state) => {
  return {
    state: state.first
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(getData(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
    textDecorationColor: 'black',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  }
});
