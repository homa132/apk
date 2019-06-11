import React,{Component} from 'react';
import {View,Picker,StyleSheet,DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux';

class TypeBtn extends Component {

    state = {
        date: "default",
        calendar: 'Календарь'
    }
    
    changeType = (value,index) => {
        value == 'today'?this.today(value):null;
        value == 'tomorrow'?this.tomorrow(value):null;
        value == 'default'?this.setState({date:value}):null;
        value == 'calendar'?this.calendar(value):null;
    }

    today = (value) => {
        const _date = new Date;
        const year = _date.getFullYear();
        let month = _date.getMonth();
        month < 10? month = `0${month + 1}`:month += 1;
        let date = _date.getDate();
        date < 10? date =`0${date}`:null
        const fullDate = `${date}.${month}.${year}`;
        console.log(fullDate);
        this.setState({date:value});
    }

    tomorrow = (value) => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        const year = tomorrow.getFullYear();
        let month = tomorrow.getMonth();
        month < 10? month = `0${month+1}`:month += 1;
        let date = tomorrow.getDate();
        date < 10? date =`0${date}`:null;
        const fullDate = `${date}.${month}.${year}`;
        this.setState({date:value});
    }

    calendar = async (value) => {
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                month < 10? month = `0${month + 1}`:month += 1;
                day < 10? day =`0${day}`:null;
                const fullDate = `${day}.${month}.${year}`;
                this.setState({date:value,calendar:fullDate});
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    } 

    render(){
        return (
            <View style={styles.conteinerBtn}>
                <Picker
                selectedValue={this.state.date}
                style={styles.pickerConteiner}
                onValueChange={(itemValue,itemIndex) => this.changeType(itemValue,itemIndex)}
                >
                    <Picker.Item label="Выберите дату" value="default" />
                    <Picker.Item label="Сегодня" value="today" />
                    <Picker.Item label="Завтра" value="tomorrow" />
                    <Picker.Item label={this.state.calendar} value="calendar" />
                </Picker>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    conteinerBtn: {
        width: 134,
        height: 40,
        backgroundColor: '#EAEAEA',
        borderColor: '#969696',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    textBtn: {
        fontSize: 17,
        color: '#4F4F4F'
    },
    pickerConteiner: {
        width: 130,
        height: 34,
    }
})

export default connect()(TypeBtn)