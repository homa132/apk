import React from 'react';
import {View,TouchableOpacity,StyleSheet,Dimensions,Text,DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {changeDate} from '../redux/actions';

import DateI from '../icon/item/calendar.svg';
const { width, height } = Dimensions.get('window');

function ChangeDate (props) {

   const calendar = async () => {
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                month < 10? month = `0${month + 1}`:month += 1;
                day < 10? day =`0${day}`:null;
                const fullDate = `${day}.${month}.${year}`;


                props.changeDate(fullDate)

            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }


    return (
        <View style={styles.dateConteiner}>
            <TouchableOpacity onPress={()=>calendar()}
                            style={styles.date}>
                <DateI/>
                <View style={{justifyContent: 'center',alignItems: 'center',
            width: 120}}>
                    <Text numberOfLines={1} style={styles.dateText}>{props.state.date}</Text>
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
        changeDate: (date) => dispatch(changeDate(date))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeDate);