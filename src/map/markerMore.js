import React from 'react';
import { StyleSheet, View,Text,TouchableOpacity,Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import {connect} from 'react-redux';
import {navigateTo,setActiveItem} from '../redux/actions';

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
              props.state.navigation.push('Details');
            }}
            >
              <View style={styles.modalContent}>
                  <Text style={styles.modalName} numberOfLines={2}>{name}</Text>
                  <View style={styles.modalDate}>
                    <Text style={styles.modalText}>Дата: {date}</Text>
                    <Text style={styles.modalText}>Время: {time}</Text>
                  </View>
                  <View style={styles.buttom}>
                    <View>
                      <Text style={styles.category}>Категори: {category.name}</Text>
                      <Text style={styles.category}>Учасников: 178</Text>
                    </View>
                      <Text style={styles.buttonText} numberOfLines={2}>Автор: Привет пака пs</Text>
                  </View>
              </View>
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
      width:260,
      height: 150,
      borderColor: '#3AE7FF',
      borderWidth: 2,
      borderRadius: 5,
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#EAEAEA',
      marginVertical: 4,
      justifyContent: 'space-around',
      padding: 7
    },
    modalName: {
      height: 50,
      width: 240,
      borderBottomColor:'#3AE7FF' ,
      borderBottomWidth: 1,
      marginHorizontal: 20,
      fontSize: 16,
      color: '#3C3C3C',
      textAlign: 'center',
      paddingBottom: 5,
    },
    modalText: {
      fontSize: 14,
      color: '#3C3C3C'
    },
    modalDate: {
      width: 240,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    moreText: {
      fontSize: 15,
      color: '#3C3C3C',
      textAlign: 'left'
    },
    buttom: {
      width: 240,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopColor: '#3AE7FF',
      borderTopWidth: 1,
      alignItems: 'center'
    },
    category: {
      fontSize: 14,
      color: '#3C3C3C',
      justifyContent: 'space-around'
    },
    buttonText: {
      fontSize: 15,
      color: '#3C3C3C',
      textAlign: 'center',
      width: 120
    },
    buttonConteiner: {
      width: 100,
      height: 20,
      borderColor: '#3AE7FF',
      borderWidth: 1,
      backgroundColor: '#F0F0F0',
      borderRadius: 7,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5
    }
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen)),
        setActiveItem: (hesh) => dispatch(setActiveItem(hesh))
    }
  }

  const mapStateToProps = (state) => {
    return {
      state: state.navigation
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(MarkerMore);