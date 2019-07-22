import React,{Component} from 'react';
import {ScrollView,StyleSheet,DatePickerAndroid,Text,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const dates = [{label:'Все даты',value:"default"},{label:'Сегодня',value:"today"},
                {label:'Завтра',value:"tomorrow"}]

class TypeBtn extends Component {

    state = {
        date: "default",
        calendar: 'Календарь'
    }
    
    changeType = (value,index) => {
        value == 'today'?this.today(value):null;
        value == 'tomorrow'?this.tomorrow(value):null;
        value == 'calendar'?this.calendar(value):null;
        if(value == 'default'){
            this.setState({date:value});
            this.props.filterData('date',value);
        }
    }

    today = (value) => {
        const _date = new Date;
        const year = _date.getFullYear();
        let month = _date.getMonth();
        month < 10? month = `0${month + 1}`:month += 1;
        let date = _date.getDate();
        date < 10? date =`0${date}`:null
        const fullDate = `${date}.${month}.${year}`;

        this.props.filterData('date',fullDate);
        
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

        this.props.filterData('date',fullDate);

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

                this.props.filterData('date',fullDate);
                this.setState({date:value,calendar:fullDate});

            }
          } catch ({code, message}) {
            console.log('Cannot open date picker', message);
          }
    } 

    render(){
        const {date,calendar} = this.state;
        return (
            <ScrollView horizontal={true} style={styles.conteinerBtn} showsHorizontalScrollIndicator={false}>
                 {dates.map(({label,value},index)=>{
                        return (
                            <TouchableOpacity onPress={()=>this.changeType(value)} key={index} >
                                <LinearGradient colors={date==value?['#FFF960','#E8BC4D']:['#F3F3F3','#D9D9D9']} 
                                                style={[styles.btn,date==value?{opacity:1}:{opacity:0.8}]}>
                                    <Text style={styles.btnText} numberOfLines={1}>{label}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity onPress={()=>this.changeType('calendar')} >
                                <LinearGradient colors={date=='calendar'?['#FFF960','#E8BC4D']:['#F3F3F3','#D9D9D9']} 
                                                style={[styles.btn,date=='calendar'?{opacity:1}:{opacity:0.8}]}>
                                    <Text style={styles.btnText} numberOfLines={1}>{calendar}</Text>
                                </LinearGradient>
                    </TouchableOpacity>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    conteinerBtn: {
        flex: 1,
        height: 44,
        flexDirection: 'row',
        paddingLeft: 5,
        marginTop: 7,
    },
    btn: {
        width: 100,
        height:30,
        borderColor: '#644800',
        marginRight:10,
        borderWidth: 1.5,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnText: {
        fontSize: 14,
        color: '#644800'
    }
})

export default connect()(TypeBtn)