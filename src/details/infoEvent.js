import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

function InfoEvent (props) {


    return(
        <React.Fragment>
            <View style={styles.infoItemConeiner}>
                 <Image source={require('../img/icons/detailsScreen/time.png')} style={{width:32,height:32}}/>
                 <Text style={styles.infoItemText}>20:40</Text>
            </View>
            <View style={styles.infoItemConeiner}>
                 <Image source={require('../img/icons/detailsScreen/date.png')} style={{width:32,height:32}}/>
                 <Text style={styles.infoItemText}>20.05</Text>
                 <Text style={{color: '#644800',fontSize:13,position: 'relative',top:-10}}>2019</Text>
            </View>
            <View style={styles.infoItemConeiner}>
                 <Image source={require('../img/icons/detailsScreen/category.png')} style={{width:32,height:32}}/>
                 <Text style={styles.infoItemText}>Спорт</Text>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    infoItemConeiner :{
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 90
    },
    infoItemText: {
        fontSize: 18,
        color: '#644800',
        letterSpacing: 0.1
    },
})

export default connect()(InfoEvent);