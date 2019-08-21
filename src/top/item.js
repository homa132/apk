import React from 'react';
import {View,TouchableOpacity,Image,StyleSheet,Dimensions,Text} from 'react-native';
import {connect} from 'react-redux';
const { width, height } = Dimensions.get('window');

function Item (props){
    const {urlImg,bal,color,nick,heshUser} = props.item.item;
    
    return (
        <View style={styles.itemConteiner}>
            <View style={[styles.imageUserConteiner,{backgroundColor: color}]}>
                <Image source={{uri: urlImg}} style={styles.imageUser}/>
            </View>

            <View style={styles.mainConteiner}>
                <Text style={styles.nickText} numberOfLines={1}>{nick}</Text>
                <View style={styles.dataConteiner}>
                    <Text style={styles.dataText} numberOfLines={1}>Балов: {bal}</Text>
                    <Image source={require('../img/icons/detailsPersonalAcc/Star.png')} style={styles.starImage}/>
                </View>
            </View>

            <TouchableOpacity style={styles.btnMoreConteiner} onPress={() => {
                props.goToUser(heshUser);
            }}>
                <Image source={require('../img/icons/btns/btnBack.png')} style={styles.btnMoreImage}/>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    itemConteiner: {
        width: width,
        height: 130,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    imageUser: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2
    },
    imageUserConteiner: {
        width: 106,
        height: 106,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starImage: {
        width: 20,
        height: 20,
        marginLeft:2
    },
    peopleImage: {
        width: 25,
        height: 25,
        marginLeft:2,
        alignSelf:'flex-end'
    },
    dataConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    mainConteiner: {
        width: width - 200,
        height: 100,
        justifyContent: 'space-around'
    },
    btnMoreImage: {
        width: 50,
        height: 50,
        transform: [{rotate: '180deg'}]
    },
    btnMoreConteiner: {
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nickText: {
        color: '#644800',
        fontSize: 22,
        fontWeight: 'bold'
    },
    dataText:{
        color: '#644800',
        fontSize: 17,
    }
})

export default connect()(Item);