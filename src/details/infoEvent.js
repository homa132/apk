import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

function InfoEvent (props) {
    const {time,date,category} = props;

    return(
        <React.Fragment>
            <View style={styles.infoItemConeiner}>
                 <Image source={require('../img/icons/detailsScreen/time.png')} style={{width:25,height:25}}/>
                 <Text style={styles.infoItemText}>20-20</Text>
            </View>
            <View style={styles.infoItemConeiner}>
                 <Image source={require('../img/icons/detailsScreen/date.png')} style={{width:25,height:25}}/>
                 <Text style={styles.infoItemText}>24.05</Text>
                 <Text style={{color: '#644800',fontSize:12,position: 'relative',top:-7}}>2019</Text>
            </View>
            <View style={styles.infoItemConeiner}>
                 <Image source={require('../img/icons/detailsScreen/category.png')} style={{width:25,height:25}}/>
                 <Text style={styles.infoItemText}>Спорт</Text>

            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    infoItemConeiner :{
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 50
    },
    infoItemText: {
        fontSize: 15,
        color: '#644800',
        letterSpacing: 0.1
    },
})

export default connect()(InfoEvent);