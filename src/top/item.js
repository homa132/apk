import React from 'react';
import {View,TouchableOpacity,Image,StyleSheet,Dimensions,Text} from 'react-native';
import {connect} from 'react-redux';
const { width, height } = Dimensions.get('window');
import Ocenka from './ocenka';
import InfoUser from './infoAboutUsers';
import { withNavigation } from 'react-navigation';


function Item (props){
    
    return (
        <View style={styles.itemConteiner}>
            <Text style={styles.nikText} numberOfLines={1}>nikNAme enfie</Text>
            <InfoUser/>

            <View style={styles.itemBottomConteiner}>
                <Ocenka/>
                <TouchableOpacity onPress={()=>props.navigation.navigate('DetailsUser')}>
                    <Image style={{width: 50,height: 50}} source={require('../img/icons/mapMarker/btnMore.png')}/>
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    itemConteiner: {
        width: width,
        height: 220,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
        alignItems: 'center'
    },
    itemBottomConteiner: {
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nikText: {
        fontSize: 18,
        color: '#644800',
        fontWeight: 'bold'
    }
})

const mapStateToProps = (state) => {
    return{
        state: state.navigation
    }
}

export default connect(mapStateToProps)(withNavigation(Item));