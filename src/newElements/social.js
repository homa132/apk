import React from 'react';
import {View,TextInput,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
const { width, height } = Dimensions.get('window');
import {setTextDate} from '../redux/actions';


import TelegrameI from '../icon/new/Telegram.svg';
import ViberI from '../icon/new/Viber.svg';
import InstaI from '../icon/new/Insagram.svg';
import FacebookI from '../icon/new/facebook.svg';
import WebI from '../icon/new/Web.svg';
import LocationI from '../icon/new/Location.svg';

function Social (props){
    

    function what(){
        if(props.name == 'telegram'){
            return (
            <React.Fragment>
                <TelegrameI/>
                <TextInput placeholder='telega' onChangeText={(telegram) => {props.setTextDate('telegram',telegram)}}
                            value={props.state.telegram} style={styles.inputItem}/>
            </React.Fragment>
            )
        }
        if( props.name == 'viber'){
            return (
            <React.Fragment>
                <ViberI/>
                            <TextInput placeholder='viber' onChangeText={(viber) => {props.setTextDate('viber',viber)}}
                                        value={props.state.viber} style={styles.inputItem}/>
            </React.Fragment>
            )
        }
        if( props.name == 'insta'){
            return (
            <React.Fragment>
                <InstaI/>
                        <TextInput placeholder='insta' onChangeText={(insta) => props.setTextDate('insta',insta)}
                                    value={props.state.insta} style={styles.inputItem}/>
            </React.Fragment>
            )
        }
        if( props.name == 'facebook'){
            return (
            <React.Fragment>
                <FacebookI/>
                        <TextInput placeholder='facebook' onChangeText={(facebook) => props.setTextDate('facebook',facebook)}
                                    value={props.state.facebook} style={styles.inputItem}/>
            </React.Fragment>
            )
        }
        if( props.name == 'web'){
            return (
            <React.Fragment>
                <WebI/>
                        <TextInput placeholder='web' onChangeText={(web) => props.setTextDate('web',web)}
                                    value={props.state.web} style={styles.inputItem}/>
            </React.Fragment>
            )
        }
        if( props.name == 'locationText'){
            return (
            <React.Fragment>
                <LocationI/>
                        <TextInput placeholder='locationText' onChangeText={(locationText) => props.setTextDate('locationText',locationText)}
                                    value={props.state.locationText} style={styles.inputItem}/>
            </React.Fragment>
            )
        }
    }

    return (
        <View style={styles.inputConteiner}>
            {what()}
        </View>
    )
}

const styles = StyleSheet.create({
    inputConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        marginVertical: 10,
    },
    inputItem: {
        width: width - 80,
        height: 30,
        borderBottomColor: '#11A1A1',
        borderBottomWidth: 2,
        paddingVertical: 0,
    },
})


const mapStateToProps = (state) => {
    return {
        state: state.new
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setTextDate: (type,value)=>dispatch(setTextDate(type,value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Social);
