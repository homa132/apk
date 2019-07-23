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
    this.state ={
      data: ['source'],
      lastEvent: {}
    }
  }

  componentDidMount(){
    this.SearchData()
    
  }

  SearchData = ()=>{
      // let getData = await firebase.firestore().collection('Events').limit(1).get();
      // console.log(getData);
    
      // this.setState({
      //   data: getData.data()
      // })

      // this.props.setDataAllEvents(getData.data());

      // var first = firebase.firestore().collection("Events").orderBy('date')
      //   .limit(2);

      // first.get().then(function (documentSnapshots) {
      //   // Get the last visible document
      //   var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      //   console.log("last", lastVisible.data());

      //   // Construct a new query starting at this document,
      //   // get the next 25 cities.
      //   var next = firebase.firestore().collection("Events").orderBy('date')
      //           .startAfter(lastVisible)
      //           .limit(2);

      //   console.log(next.data());
        
      // });

      const first = firebase.firestore().collection('Events').orderBy('date').limit(2);
      first.get().then((item) => {
        let data = [];

        item.forEach((i) => {
          data.push(i.data());
        })

        let lastEvent = item.docs[item.docs.length-1];
        
        this.setState({data: [...this.state.data,...data],lastEvent})

      })



  }

  addData = () => {

    if(this.state.lastEvent != {}){
      const addData = firebase.firestore().collection('Events').orderBy('date').startAfter(this.state.lastEvent).limit(2);
      addData.get().then((item) => {
        let data = [];
  
        item.forEach((i) => {
          data.push(i.data());
        })
        let lastEvent = item.docs[item.docs.length-1];

        this.setState({data: [...this.state.data,...data],lastEvent})
      })
    }

    console.log('add data');

  }

  render() {
    const {data} = this.state;


      return (
        <ImageBackground style={styles.background} source={require('../img/background/background1.jpg')}>
            <View style={styles.container}>
                <View style={{width: width,height: height - 75}}>
                  <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
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
                    onEndReachedThreshold={0.001}
                    onEndReached={(info) => this.addData()}
                    bounces={false}
                    initialNumToRender={2}
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
