import React from 'react';
import {View,TouchableOpacity,Image,StyleSheet,Dimensions,Text} from 'react-native';
import {connect} from 'react-redux';
const { width, height } = Dimensions.get('window');
import { withNavigation } from 'react-navigation';


function Item (props){
    
    return (
        <View style={styles.itemConteiner}>
            <View style={styles.imageUserConteiner}>
                <Image source={require('../img/testImage.png')} style={styles.imageUser}/>
            </View>

            <View style={styles.mainConteiner}>
                <Text style={styles.nickText} numberOfLines={1}>nick name 123</Text>
                <View style={styles.dataConteiner}>
                    <Text style={styles.dataText} numberOfLines={1}>Балов: 160</Text>
                    <Image source={require('../img/icons/detailsPersonalAcc/Star.png')} style={styles.starImage}/>
                </View>
                <View style={styles.dataConteiner}>
                    <Text style={styles.dataText} numberOfLines={1}>Позиция: 10</Text>
                    <Image source={require('../img/icons/detailsPersonalAcc/people.png')} style={styles.peopleImage}/>
                </View>
            </View>

            <TouchableOpacity style={styles.btnMoreConteiner}>
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
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2
    },
    imageUserConteiner: {
        width: 106,
        height: 106,
        backgroundColor: 'red',
        borderRadius: 53,
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
        height: 50
    },
    btnMoreConteiner: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        rotation:180
    },
    nickText: {
        color: '#644800',
        fontSize: 19,
        fontWeight: 'bold'
    },
    dataText:{
        color: '#644800',
        fontSize: 17,
    }
})

const mapStateToProps = (state) => {
    return{
        state: state.navigation
    }
}

export default connect(mapStateToProps)(withNavigation(Item));