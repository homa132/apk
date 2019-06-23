import React, {Component} from 'react';
import {StyleSheet, Dimensions, View,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {getData,setNavigation} from '../redux/actions'
import firebase from 'react-native-firebase';
import Map from '../map/map';
import NavBtn from '../navBtn/navBtn';
import FilterBtn from '../filterBtn/filterBtn';

const { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('list');
    this.state = {
      loader: true
    }
  }

  componentDidMount() {
    this.SearchData();
    this.props.setNavigation(this.props.navigation)
  }

  SearchData(){
    let data = [];
    this.unsubscribe = this.ref.onSnapshot((newData) => {
      newData.forEach(item => {
        data.push(item.data());
      })
    });
    this.props.getData(data);
    this.setState({loader:false});
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let {loader} = this.state;

    if(loader){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
          <View style={styles.containerFilterBtn}>
            <FilterBtn/>
          </View>
          <View style={styles.mapConteiner}>
              <Map/>
          </View>
        </View>
      );
    }

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
    setNavigation: (nav) => dispatch(setNavigation(nav))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  mapConteiner: {
    width: width,
    height: height,
    overflow: 'hidden'
  },
  bottomNav: {
    position: 'absolute',
    bottom: 3,
    flexDirection: 'row',
  },
  containerFilterBtn: {
    position: 'absolute',
    top: 10,
    width: width,
    zIndex: 100
  }
});
