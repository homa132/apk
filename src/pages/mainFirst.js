import React, {Component} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {getData} from '../redux/actions'
import firebase from 'react-native-firebase';
import Map from '../map/map';
import NavBtn from '../navBtn/navBtn';
import FilterBtn from '../filterBtn/filterBtn';

const { width, height } = Dimensions.get('window');

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
    return (
      <View style={styles.container}>
        <View style={styles.containerFilterBtn}>
          <FilterBtn/>
        </View>
        <View style={styles.mapConteiner}>
            <Map/>
        </View>
        <View style={styles.bottomNav}>
          <NavBtn/>
        </View>
      </View>
    );
  }
}




const mapStateToProps = (state) => {
  return {
    state: state.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (data) => dispatch(getData(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapConteiner: {
    width: width,
    height: height,
    overflow: 'hidden'
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
  },
  containerFilterBtn: {
    position: 'absolute',
    top: 10,
    width: width,
    zIndex: 100
  }
});
