import React from 'react';
import {View,TouchableOpacity,StyleSheet,Text,TimePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {changeTime} from '../redux/actions';
import TimeI from '../icon/item/time.svg';


function ChangeTime (props) {
    time = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 0,
              minute: 0,
              is24Hour: true, 
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const newHour = hour <10?`0${hour}`:hour;
                const newMinute = minute < 10?`0${minute}`:minute;
                const fullTime = `${newHour}:${newMinute}`;
                props.changeTime(fullTime);
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }
    return (
        <View style={styles.dateConteiner}>
            <TouchableOpacity onPress={()=>time()}
                            style={styles.date}>
                <TimeI/>
                <View style={{justifyContent: 'center',alignItems: 'center',
            width: 120}}>
                    <Text numberOfLines={1} style={styles.dateText}>{props.state.time}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    dateConteiner: {
        width: 160,
        height: 30,
        backgroundColor: '#13D9D9',
        borderRadius: 20,
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 140
    },
    dateText: {
        fontSize: 15,
        color: '#000000'
    },
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeTime: (time) => dispatch(changeTime(time))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeTime);