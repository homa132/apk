import React, {Component} from 'react';
import {StyleSheet, Dimensions, View,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import Map from '../map/map';
import FilterBtn from '../main/filterBtn/filterBtn';
import {setDataAllEvents} from '../redux/actions';

const { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('list');
    this.SearchData();
  }

  SearchData = async ()=>{
    await this.ref.onSnapshot((newData) => {
      let data = [];
      newData.forEach(item => {
        data.push(item.data());
      });
      this.props.setDataAllEvents(data);
    });
  }


  render() {
      return (
        <View style={styles.container}>
          <View style={styles.containerFilterBtn}>
            <FilterBtn/>
          </View>
          <View style={styles.mapConteiner}>
              <Map listEvents={this.props.listEvents}/>
          </View>
        </View>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    listEvents: state.data.testList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setDataAllEvents: (events) => dispatch(setDataAllEvents(events))
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
    top: 0,
    width: width,
    zIndex: 100
  }
});
