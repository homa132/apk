import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo,setActiveItem} from '../redux/actions';
import Messenger from '../btns/messenger';
import LikesDis from '../btns/likesDis';

import DateI from '../icon/item/calendar.svg';
import CategI from '../icon/item/category.svg';
import TimeI from '../icon/item/time.svg';


const { width, height } = Dimensions.get('window');


function Item (props) {
    const {name,heshMessenger,date,time,category,hesh} = props.item;
    
    return (
    <View style={styles.conteiner}>
        <View style={styles.itemTop}>
            <Text style={styles.itemName} numberOfLines={3}>{name}</Text>
            <Messenger/>
        </View>
        <View style={styles.images}>
        </View>
        
        <View style={styles.infoStyle}>
            <View style={styles.infoItem}>
                <DateI/>
                <View style={{alignItems: 'center', justifyContent: 'center',width: '90%'}}>
                    <Text style={styles.infoText}>{date}</Text>
                </View>
            </View>
            <View style={styles.infoItem}>
                <CategI/>
                <View style={{alignItems: 'center', justifyContent: 'center',width: '90%'}}>
                    <Text style={styles.infoText}>{category.name}</Text>
                </View>
            </View>
            <View style={styles.infoItem}>
                <TimeI/>
                <View style={{alignItems: 'center', justifyContent: 'center',width: '90%'}}>
                    <Text style={styles.infoText}>{time}</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.buttom}>
            <LikesDis/>
            <TouchableOpacity style={styles.btnMore}
            onPress={()=>{
                props.setActiveItem(hesh);
                props.navigateTo('Details')
                    }}>
                <Text style={styles.btnMoreText}>Подробнее</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width,
        marginBottom: 25,
        borderTopColor: '#13D9D9',
        borderTopWidth: 1.4,
        paddingTop: 15,
    },
    itemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 15,
    },
    itemName: {
        color: '#11A1A1',
        fontSize: 16,
        lineHeight: 15,
        maxWidth: width - 80,
        textAlign: 'center'
    },
    btnMess: {
        borderColor: '#4F4F4F',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        width: width,
        height: width,
        backgroundColor: '#C0C0C0',
        marginVertical: 10,
    },
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 25,
        width: 140,
        borderColor: '#969696',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#4F4F4F',
        letterSpacing: 0.5,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    buttom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        width: width
    },

    btnMore: {
        width: 140,
        height: 40,
        borderColor: '#11A1A1',
        borderWidth:2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA'
    },
    btnMoreText: {
        color: '#4F4F4F',
        fontSize: 16,
        letterSpacing:1
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen)),
        setActiveItem: (hesh) => dispatch(setActiveItem(hesh))
    }
  }

export default connect (null,mapDispatchToProps)(Item);