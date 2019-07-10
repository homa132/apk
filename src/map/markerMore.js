import React from 'react';
import { StyleSheet, View,Text,Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import {connect} from 'react-redux';
import {setActiveItem} from '../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';

function MarkerMore (props) {
    
  const {location,name,time,date,category,hesh} = props.item;
  
    return(
        <Marker
            coordinate={location}
          >
            <View>
              <Image source={{uri: 'https://image.shutterstock.com/image-vector/light-bulb-line-icon-vector-260nw-416374336.jpg'}}
                    style={{width: 30,height: 30,borderRadius: 30}}/>
            </View>
            
            <Callout 
            style={styles.plainView}
            onPress={() => {
              props.setActiveItem(hesh);
              props.navigation.navigate('Details');
            }}
            >
              <LinearGradient start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} colors={['#FDFDFD','#EFEFEF','#FDFDFD']} 
                            locations={[0.01,0.5,0.99]} style={styles.modalContent}>
                  <Text numberOfLines={2} style={styles.nameText}>{name}Турнир с футбoла для школьников</Text>

                  <View style={styles.infoConteiner}>
                    <View style={styles.infoItemConteiner}>
                      <Image source={require('../img/icons/mapMarker/time.png')} style={styles.imgInfo}/>
                      <Text style={styles.infoItemText} numberOfLines={1}>{time}</Text>
                    </View>
                    <View style={styles.infoItemConteiner}>
                      <Image source={require('../img/icons/mapMarker/date.png')} style={styles.imgInfo}/>
                      <Text style={styles.infoItemText} numberOfLines={1}>{date.month}</Text>
                      <Text style={[styles.infoItemText,{fontSize:10,position:'relative',top:-5}]} numberOfLines={1}>{date.year}</Text>
                    </View>
                    <View style={styles.infoItemConteiner}>
                      <Image source={require('../img/icons/mapMarker/category.png')} style={styles.imgInfo}/>
                      <Text style={styles.infoItemText} numberOfLines={1}>{category.name}</Text>
                    </View>
                  </View>

                <View style={styles.bottomConteiner}>
                  <View style={styles.autorConteiner}>
                    <Image source={{uri:'https://mint-media.pl/wp-content/uploads/2018/02/client-1295901_960_720.png'}} 
                    style={styles.autorImage}/>
                    <Text style={styles.autorText}>автор ник</Text>
                  </View>
                  <Image source={require('../img/icons/mapMarker/btnMore.png')} style={styles.autorImage}/>
                </View>
              </LinearGradient>
            </Callout>
          </Marker>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
    },
    modalContent: {
      width:240,
      height: 140,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nameText: {
      fontSize: 15,
      color: '#644800',
      textAlign: 'center',
      width: 220,
      height: 42
    },
    infoConteiner: {
      width: 240,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    infoItemConteiner: {
      width:80,
      height: 45,
      alignItems: 'center',
      justifyContent:'space-between'
    },
    imgInfo: {
      width: 26,
      height: 26
    },
    infoItemText: {
      fontSize: 15,
      color:'#644800'
    },
    bottomConteiner: {
      width: 240,
      height: 35,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    autorConteiner: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    autorImage: {
      width: 30,
      height: 30,
      borderRadius: 15
    },
    autorText: {
      color: '#000000',
      fontSize: 14,
      marginLeft: 8,
    }
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (hesh) => dispatch(setActiveItem(hesh))
    }
  }

  const mapStateToProps = (state) => {
    return {
      state: state.navigation
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(MarkerMore));