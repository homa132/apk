import React, {Component} from 'react';
import {StyleSheet, Dimensions, View,ScrollView,ImageBackground,FlatList} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import FilterBtn from '../main/filterBtn/filterBtn';
import {setDataAllEvents} from '../redux/actions';
import Event from '../main/event';

const { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props){
    super(props);
    this.SearchData();
    this.state ={
      data: ['1','2','3','4','5']
    }
  }

  SearchData = async ()=>{
    await firebase.firestore().collection('ListEvents').onSnapshot((newData) => {
      let data = [];
      newData.forEach(item => {
        data.push(item.data());
      });

      console.log(data);
      
      this.props.setDataAllEvents(data);
    });
  }

  addData = () => {
    this.setState({data: [...this.state.data,'10','11','12','13','14','15','16']})
  }

  render() {
    const {data} = this.state;


      return (
        <ImageBackground style={styles.background} source={require('../img/background/background1.jpg')}>
            <View style={styles.container}>
                <View style={{width: width,height: height - 75}}>
                  <FlatList
                    data={data}
                    renderItem={({item,index}) => {
                    if(index == 0){
                      return (
                        <View style={styles.containerFilterBtn}>
                          <FilterBtn/>
                        </View>
                      )}else{
                        return <Event item={item}/>
                      }
                    }}
                    onEndReachedThreshold={0.00001}
                    onEndReached={(info) => this.addData()}
                    bounces={false}
                  />
                </View>


            </View>
        </ImageBackground>

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
  background: {
    width: width,
    height: height
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  containerFilterBtn: {
    width: width,
  },
});
