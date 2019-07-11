import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet,Dimensions,Image} from 'react-native';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');

function userInfo (props){
    return(
        <View style={styles.itemTopConteiner}>
            <View style={styles.itemImageConteiner}>
                <Image style={styles.itemImage} source={require('../img/testImage.png')}/>
            </View>
            
            <View style={styles.itemTopInfoConteiner}>

                <View style={styles.itemTopPersonalInfoConteiner}>

                    <TouchableOpacity style={styles.topInfoItem}>
                        <Text style={styles.infoTextNumber}>50</Text>
                        <Text style={styles.infoText}>Подписки</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.topInfoItem}>
                        <Text style={styles.infoTextNumber}>180</Text>
                        <Text style={styles.infoText}>Подписчики</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.topInfoItem}>
                        <Text style={styles.infoTextNumber}>3</Text>
                        <Text style={styles.infoText}>События</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.infoBalConteiner,{marginTop: 10}]}>
                    <Text style={styles.infoBalText}>Балов: 104</Text>
                    <Image style={styles.infoBAlImage} source={require('../img/icons/detailsPersonalAcc/Star.png')}/>
                </View>
                <View style={styles.infoBalConteiner}>
                    <Text style={styles.infoBalText}>Позиция: 70</Text>
                    <Image style={{width:25,height: 25}} source={require('../img/icons/detailsPersonalAcc/people.png')}/>
                </View>

            </View>
            </View>
    )
}
const styles = StyleSheet.create({
    itemTopConteiner: {
        flexDirection: 'row',
        width: width - 20,
        alignItems: 'center',
        height: 120
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1.5
    },
    itemImageConteiner: {
        width: 106,
        height: 106,
        borderRadius: 53,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTopInfoConteiner: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    itemTopPersonalInfoConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 240,
        height: 40
    },
    topInfoItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center'
    },
    infoTextNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#644800'
    },
    infoText: {
        color: '#644800',
        fontSize: 12
    },
    infoBalConteiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 2.5
    },
    infoBalText: {
        fontSize: 17,
        color: '#644800',
        fontWeight: 'bold'
    },
    infoBAlImage: {
        width: 20,
        height: 20
    },
})

export default connect()(userInfo)