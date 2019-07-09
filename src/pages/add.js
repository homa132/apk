import React,{Component} from 'react';
import {View,TouchableOpacity,StyleSheet,ScrollView,Dimensions,ImageBackground,TextInput,Image,Text,
    TimePickerAndroid,Picker,DatePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {setNewData} from '../redux/actions';
import Conteiner from '../add/conteinerAddScreen'
import LinearGradient from 'react-native-linear-gradient';


const { width, height } = Dimensions.get('window');

const types = [{label:'Тип события',value:"default"},{label:"Спорт", value:"sport"},
            {label:"IT", value:"it"},{label:"Клубы", value:"club"},{label:"Музыка", value:"music"}]

class Add extends Component{

    state = {
        scrollEnd: 0
    }

    //create social inputs
    socialItem = (placeholder,name) => {
        let icon;
        if(name == 'telegrame'){icon=require('../img/icons/detailsScreen/telegrame.png')};
        if(name == 'facebook'){icon=require('../img/icons/detailsScreen/facebook.png')};
        if(name == 'instagrame'){icon=require('../img/icons/detailsScreen/inst.png')};
        if(name == 'webSite'){icon=require('../img/icons/detailsScreen/web.png')};

        return (
            <View style={styles.socialConteiner}>
                <Image style={styles.socialImg} source={icon}/>
                <TextInput style={styles.socialInput} placeholder={placeholder} placeholderTextColor='#644800' 
                    value={this.props.state[name]} onChangeText={(value)=>this.setDataRedax(value,'contacts',name)}/>
            </View>
        )
    }

    setTime = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 0,
              minute: 0,
              is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const setHour = hour<10?`0${hour}`:hour;
                const setMinute = minute<10?`0${minute}`:minute;
                const fullTime = `${setHour}-${setMinute}`
                await this.setDataRedax(fullTime,'time');
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }

    setDate = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              const setMonth = month + 1<10?`0${month + 1}`:month + 1;
              const setDay = day < 10?`0${day}`:day ;
              const fullDate = {month:`${setDay}.${setMonth}`,year:year}
              this.setDataRedax(fullDate,'date')
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    setDataRedax = (value,name,secondName) => {
        if(name == 'category'){
            value = types.filter((item)=>item.value == value);
            this.props.setNewData(value[0],name,secondName);
        }else{
            this.props.setNewData(value,name,secondName);
        }
    }

    saveEvent = () => {
        console.log('save');
    }

    render(){
        const {scrollEnd} = this.state;
        const {category,contacts,date,hesh,heshAutor,heshMessenger,
            images,location,name,nameAutor,textMore,time,save} = this.props.state;

        return (
                <Conteiner scrollEnd={scrollEnd}>
                    <ImageBackground source={require('../img/background/background1.jpg')} style={styles.backgroundConteiner}>
                        <View style={styles.line}></View>
                        <ScrollView onMomentumScrollEnd={(e)=>this.setState({scrollEnd:e.nativeEvent.contentOffset.y})} >
                            <View style={styles.conteiner} >

                                <TextInput placeholder='название события' placeholderTextColor='#644800' style={styles.nameInput}
                                        numberOfLines={1} value={name} onChangeText={(value)=>this.setDataRedax(value,'name')}/>

                                <View style={styles.addBtnsConteiner}>
                                    <TouchableOpacity onPress={this.setTime}>
                                        <LinearGradient style={styles.addBtn} colors={['#FFF960','#E8BC4D']}>
                                            <Image style={styles.addBtnImg} source={require('../img/icons/detailsScreen/time.png')}/>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    
                                    <Picker style={styles.typePicker} onValueChange={(value,index)=>this.setDataRedax(value,'category')}
                                        selectedValue={category.value}>
                                        {types.map((item,index)=><Picker.Item label={item.label} value={item.value} key={index}/>)}
                                    </Picker>

                                    <TouchableOpacity onPress={this.setDate}>
                                        <LinearGradient style={styles.addBtn} colors={['#FFF960','#E8BC4D']}>
                                            <Image style={styles.addBtnImg} source={require('../img/icons/detailsScreen/date.png')}/>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>

                                <TextInput multiline={true} numberOfLines={1} style={styles.detailsInput} placeholder='детали события'
                                    placeholderTextColor='#644800' onChangeText={(value)=>this.setDataRedax(value,'textMore')}
                                    value={textMore}/>

                                <Text style={styles.dopDataText}>дополнительный данные</Text>

                                {this.socialItem('https://t.me/','telegrame')}
                                {this.socialItem('https://www.facebook.com/','facebook')}
                                {this.socialItem('https://www.instagram.com/','instagrame')}
                                {this.socialItem('https://www.google.com/','webSite')}

                                <TouchableOpacity onPress={this.saveEvent} disabled={!save} style={save?{opacity:1}:{opacity:0.5}}>
                                    <LinearGradient colors={['#FFF960','#E8BC4D']} style={styles.saveBtnConteiner}  >
                                        <Text style={styles.saveBtnText}>Создать</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </Conteiner>
        )
    }
};

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
    },
      line: {
        width: 60,
        borderColor: '#644800',
        borderWidth: 2,
        borderRadius: 2,
        marginTop: 12,
        marginLeft:width/2-30,
        marginBottom:20
    },
    backgroundConteiner: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
    },
    nameInput: {
        width: width - 60,
        fontSize: 18,
        color: '#644800',
        borderRadius: 10,
        borderColor: '#644800',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 2.5,
        marginTop: 20
    },
    addBtnsConteiner: {
        flexDirection: 'row',
        width: width - 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        maxWidth: width - 40
    },
    addBtn: {
        width: 50,
        height: 50,
        borderColor: '#644800',
        borderWidth: 2,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addBtnImg: {
        width: 40,
        height: 40
    },
    detailsInput: {
        width:width-40,
        borderColor: '#644800',
        borderWidth: 2,
        fontSize: 17,
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 35
    },
    dopDataText: {
        color: '#644800',
        fontSize: 20,
        textShadowColor: 'rgba(100, 72, 0, 0.5)',
        textShadowOffset: {width: 0,height: 4},
        textShadowRadius: 4,
        marginTop: 22
    },
    socialConteiner: {
        width: 280,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    socialInput: {
        width: 230,
        borderColor: '#644800',
        borderWidth: 2,
        fontSize: 17,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    socialImg: {
        width: 35,
        height: 35
    },
    saveBtnConteiner: {
        marginTop: 25,
        width: 110,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#644800',
        borderWidth: 2,
        borderRadius: 30,
        marginBottom:20

    },
    saveBtnText: {
        fontSize: 18,
        color: '#644800',
    },
    typeConteiner: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    typePicker: {
        width: 150,
        height: 40,
        color: '#644800'
    },
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setNewData: (value,name,secondName)=> dispatch(setNewData(value,name,secondName))
    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Add);