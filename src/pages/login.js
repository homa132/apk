import React,{Component} from 'react';
import {View,Text,ImageBackground,StyleSheet,TouchableOpacity,Image,Dimensions,
    TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { StackActions } from 'react-navigation';
import InfoUser from '../detailsUser/infoAboutUsers'
import Ocenka from '../detailsUser/ocenka';

const { width, height } = Dimensions.get('window');

class Login extends Component{

    state = {
        aboutYou: '',
        telegrame: '',
        facebook: '',
        instagrame: '',
        webSite: ''
    }

    _signOutAsync = async () => {
        await firebase.auth().signOut();
        await AsyncStorage.clear();
        StackActions.reset({
            index: 0,
            actions: [],
          });
        this.props.navigation.navigate('Auth');
      };

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
                    value={this.state[name]} onChangeText={(value)=>this.setState({[name]:value})}/>
            </View>
        )
    }

    render(){
        const {aboutYou} = this.state;
        
        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.headerConteiner}>
                            <View style={styles.headerTextConteiner}>
                                <Text numberOfLines={1} style={styles.headerText}>nik name anrey</Text>
                            </View>
                            <TouchableOpacity style={styles.btnSingOutConteiner} onPress={this._signOutAsync}>
                                <Image source={require('../img/icons/btns/btnSingOut.png')} style={{width: 50,height: 50}}/>
                            </TouchableOpacity>
                        </View>

                        <InfoUser/>
                        <Ocenka/>

                        <View style={styles.detaisConteiner}>
                            <Text style={styles.detailsMainText}>Дополнительный данные о Вас</Text>

                            <TextInput numberOfLines={1} multiline={true} placeholder='Роскажите о себе' placeholderTextColor='#644800'
                                style={styles.aboutYou} value={aboutYou} onChangeText={(aboutYou)=>this.setState({aboutYou})}/>
                            {this.socialItem('https://t.me/','telegrame')}
                            {this.socialItem('https://www.facebook.com/','facebook')}
                            {this.socialItem('https://www.instagram.com/','instagrame')}
                            {this.socialItem('https://www.google.com/','webSite')}
                        </View>

                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    background:{
        width: '100%',
        height: '100%'
    },
    headerConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderBottomColor: '#644800',
        borderBottomWidth: 3,
        width: width,
        marginBottom: 10
    },
    headerTextConteiner: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width-60
    },
    headerText: {
        fontSize: 22,
        color: '#644800',
        letterSpacing: 0.5
    },
    btnSingOutConteiner: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detaisConteiner: {
        width: width - 40,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    detailsMainText: {
        fontSize: 20,
        color: '#644800',
        textShadowColor: 'rgba(100, 72, 0, 0.6)',
        textShadowOffset: {width: 0,height: 4},
        textShadowRadius: 4
    },
    aboutYou: {
        fontSize: 17,
        color: '#644800',
        textAlign: 'center',
        width: width - 80,
        borderColor: '#644800',
        borderWidth: 1.5,
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 2
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
})

export default connect()(Login);