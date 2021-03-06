import React, {Component} from 'react';
import {StyleSheet, Dimensions, View,ScrollView,ImageBackground,FlatList} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import FilterBtn from '../main/filterBtn/filterBtn';
import {getEvents} from '../redux/actions';
import Event from '../main/event';

const { width, height } = Dimensions.get('window');

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      refresh: false
    }
  }
  
  componentDidMount(){
    this.firstEvents()
  }

  firstEvents = () => {
      const first = firebase.firestore().collection('Events').orderBy('dateCreate', 'desc').limit(5);
      first.get().then((item) => {
        let data = [];

        item.forEach((i) => {
          data.push(i.data());
        })

        let lastEvent = item.docs[item.docs.length-1];
        this.props.getEvents(['filter',...data],lastEvent)
      })
  }

  addData = () => {
    const {arrayEvent,lastEvent,date,type} = this.props;
    
    if(date == 'default' || type == 'default'){

      if(date == 'default' && type != 'default'){

        const first = firebase.firestore().collection('Events').where('type','==',type).orderBy('dateCreate', 'desc').startAfter(lastEvent).limit(5);
        first.get().then((item) => {
          let data = [];

          item.forEach((i) => {
            data.push(i.data());
          })

          let lastEvent = item.docs[item.docs.length-1];
          if(lastEvent != this.props.lastEvent){
            this.props.getEvents([...arrayEvent,...data],lastEvent)
          }
        })
      }

      if(date != 'default' && type == 'default'){
        const second = firebase.firestore().collection('Events').where('fullDate','==',date).orderBy('dateCreate', 'desc').startAfter(lastEvent).limit(5);
        second.get().then((item) => {
          let data = [];

          item.forEach((i) => {
            data.push(i.data());
          })

          let lastEvent = item.docs[item.docs.length-1];
          if(lastEvent != this.props.lastEvent){
            this.props.getEvents([...arrayEvent,...data],lastEvent)
          }

        })
      }

      // get all data
      if(date == 'default' && type == 'default'){
        const addData = firebase.firestore().collection('Events').orderBy('dateCreate','desc').startAfter(lastEvent).limit(5);
        addData.get().then((item) => {
          let data = [];
          item.forEach((i) => {
            data.push(i.data());
          })

          let lastEvent = item.docs[item.docs.length-1];
          if(lastEvent != this.props.lastEvent){
            this.props.getEvents([...arrayEvent,...data],lastEvent)
            
          }
        })
      }
    }else{
      const four = firebase.firestore().collection('Events').where('fullDate','==',date).where('type','==',type)
      .orderBy('dateCreate', 'desc').startAfter(lastEvent).limit(5)
      four.get().then((item) => {
        let data = [];

        item.forEach((i) => {
          data.push(i.data());
        })
        
        let lastEvent = item.docs[item.docs.length-1];
        this.props.getEvents([...arrayEvent,...data],lastEvent);
      })
    }

  }

  getFilterData = (refresh) => {
    const {date,type} = this.props;
    
    if(date == 'default' || type == 'default'){
      if(date == 'default' && type != 'default'){
        const first = firebase.firestore().collection('Events').where('type','==',type).orderBy('dateCreate', 'desc').limit(5);
        first.get().then((item) => {
          let data = [];

          item.forEach((i) => {
            data.push(i.data());
          })

          let lastEvent = item.docs[item.docs.length-1];
          this.props.getEvents(['filter',...data],lastEvent);
          refresh?this.setState({refresh: false}):null;
        })
      }

      if(date != 'default' && type == 'default'){
        
        const second = firebase.firestore().collection('Events').where('fullDate','==',date).orderBy('dateCreate', 'desc').limit(5);
        second.get().then((item) => {
          let data = [];

          item.forEach((i) => {
            data.push(i.data());
          })

          let lastEvent = item.docs[item.docs.length-1];
          this.props.getEvents(['filter',...data],lastEvent);
          refresh?this.setState({refresh: false}):null;
        })
      }
          // get all list
      if(date == 'default' && type == 'default'){

        const three = firebase.firestore().collection('Events').orderBy('dateCreate', 'desc').limit(5);
        three.get().then((item) => {
          let data = [];

          item.forEach((i) => {
            data.push(i.data());
          })
          
          let lastEvent = item.docs[item.docs.length-1];

          this.props.getEvents(['filter',...data],lastEvent);
          refresh?this.setState({refresh: false}):null;
        })
      }
    }else{
      const four = firebase.firestore().collection('Events').where('fullDate','==',date).where('type','==',type).orderBy('dateCreate', 'desc').limit(5)
      four.get().then((item) => {
        let data = [];

        item.forEach((i) => {
          data.push(i.data());
        })
        
        let lastEvent = item.docs[item.docs.length-1];
        this.props.getEvents(['filter',...data],lastEvent);
        refresh?this.setState({refresh: false}):null;
      })
    }


  }

  componentDidUpdate(prevProps){
    if(prevProps.date != this.props.date || prevProps.type != this.props.type){
      this.getFilterData();
    }
  }

  refreshData = () => {
    this.setState({refresh: true});
    this.getFilterData(true);
  }

  render() {
    const {arrayEvent,type,date} = this.props;
    
      return (
        <ImageBackground style={styles.background} source={require('../img/background/background1.jpg')}>
            <View style={styles.container}>
                <View style={{width: width,height: height - 75}}>
                  <FlatList
                    data={arrayEvent}
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
                    refreshing={this.state.refresh}
                    onRefresh={this.refreshData}
                  />
                </View>


            </View>
        </ImageBackground>

      );
  }
}


const mapStateToProps = (state) => {
  return {
    arrayEvent: state.data.arrayEvent,
    lastEvent: state.data.lastEvent,
    date: state.data.date,
    type: state.data.type
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (arrayEvent,lastEvent) => dispatch(getEvents(arrayEvent,lastEvent))
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
