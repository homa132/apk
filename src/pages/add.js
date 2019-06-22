import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions,ImageBackground,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {setTextDate} from '../redux/actions';

//elements
import NavBtn from '../navBtn/navBtn';
import SaveBtn from '../btns/saveNew';
import Map from '../map/map';
import NameInput from '../newElements/nameInput';
import Images from '../newElements/images';
import ChangeType from '../newElements/changeCategory';
import ChangeDate from '../newElements/changeDate';
import ChangeTime from '../newElements/changeTime';
import Social from '../newElements/social';

const { width, height } = Dimensions.get('window');


class Add extends Component{


    state = {
        name: '',
        type: "default",
        date: 'Дата события',
        time: 'Время события',
        moreText: '',
        telegram:'',
        viber: '',
        insta: '',
        facebook: '',
        web: '',
        locationText: ''
    }


    render(){
        
        return (
        <ImageBackground style={{width: width,height: height - 22,padding: 0,margin: 0}} source={require('../icon/background.jpg')}>
            <View style={styles.container}>
                <ScrollView style={{width: width,height: height}}>
                    <View style={styles.headerConteiner}>
                        <Text style={styles.headerText}>Создание события</Text>
                        <SaveBtn/>
                    </View>

                    <Text style={styles.optionalText}>Обязательная информация</Text>
                    <NameInput/>
                    <Images/>
                    <ChangeType/>
                    
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
                        <ChangeDate/>
                        <ChangeTime/>
                    </View>

                    <View style={{justifyContent:'center',alignItems: 'center',width: width}}>
                        <TextInput onChangeText={(moreText) => this.props.setTextDate('moreText',moreText)}
                                    value={this.props.state.moreText} style={styles.moreText}
                                    placeholder="Подробности события"
                                    multiline={true} />
                    </View>
                    <Social name='locationText'/>
                    <View style={styles.map}>
                        <Map new={true}/>
                    </View>

                    <Text style={styles.optionalText}>Дополнительная информация</Text>

                    <Social name='telegram'/>
                    <Social name='viber'/>
                    <Social name='insta'/>
                    <Social name='facebook'/>
                    <Social name='web'/>

                    <View style={{width:width,height: 60}}></View>
                </ScrollView>
                <View style={styles.bottomNav}>
                    <NavBtn/>
                </View>
            </View>
        </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    optionalText: {
        marginVertical: 10,
        alignSelf: 'center',
        color: '#8C8C8C',
        fontSize: 18,
        textShadowColor: '#717171',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 50,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 5,
        flexDirection: 'row',
      },
    headerConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,
        alignItems: 'center',
        height: 60,
        borderBottomColor: '#11A1A1',
        borderBottomWidth: 2,
        paddingLeft: 20,
        paddingRight: 10,
    },
    headerText: {
        fontSize: 22,
        letterSpacing: 0.5,
        textShadowColor: '#A4A4A4',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 15,
        color: '#000000'
    },

    moreText: {
        width: width - 30,
        borderBottomColor: '#11A1A1',
        borderBottomWidth: 2,
        fontSize: 16,
        marginTop: 20
    },
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
    map: {
        width: width - 80,
        height: width + 80,
        borderRadius: 20,
        borderColor: '#11A1A1',
        borderWidth: 1.4,
        overflow: 'hidden',
        alignSelf: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setTextDate: (name,value) => dispatch(setTextDate(name,value))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Add);