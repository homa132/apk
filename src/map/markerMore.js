import React from 'react';
import { StyleSheet, View,Text,TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';


function MarkerMore (props) {
    const {location,name,time,date,category,hesh,textMore} = props.item
    return(
        <Marker
            coordinate={location}
          >
            <Callout 
            style={styles.plainView}
            onPress={() => {
              this.props.navigateTo('Details')
            }}
            >
              <View style={styles.modalContent}>
                  <Text style={styles.modalName} numberOfLines={2}>{name}</Text>
                  <View style={styles.modalDate}>
                    <Text style={styles.modalText}>Дата: {date}</Text>
                    <Text style={styles.modalText}>Время: {time}</Text>
                  </View>
                  <Text style={styles.moreText} numberOfLines={3}>{textMore}</Text>
                  <View style={styles.buttom}>
                    <View>
                      <Text style={styles.category}>Категори: {category}</Text>
                      <Text style={styles.category}>Учасников: 178</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonConteiner}>
                      <Text style={styles.buttonText}>Подробнее</Text>
                    </TouchableOpacity>
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
      height: 180,
      borderColor: '#3AE7FF',
      borderWidth: 2,
      borderRadius: 5,
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#EAEAEA',
      marginVertical: 4,
      justifyContent: 'space-around'
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
      marginTop: 5
    },
    moreText: {
      fontSize: 15,
      color: '#3C3C3C',
      textAlign: 'left'
    },
    buttom: {
      width: 240,
      height: 40,
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
  

export default MarkerMore;