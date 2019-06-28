import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions,TextInput,ImageBackground,Image,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');


class SignInScreen extends Component {

    state = {
        login: '',
        password: ''
    }

    static navigationOptions = {
      title: 'Please sign in',
    };

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
      };
    
    render() {
      return (
          <ImageBackground source={require('../img/background/background1.jpg')} style={{width: width,height: height}}>
            <View style={styles.conteiner}>

                <View style={styles.headerContiner}>
                    <TouchableOpacity style={styles.headerBtnBackConteiner}>
                        <Image style={styles.headerBtnBack} source={require('../img/icons/btns/btnBack.png')}/>
                    </TouchableOpacity>
                    <View style={styles.headerTextConteiner}>
                        <Text style={styles.headerText}>Регистрация</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.mainConteiner}>
                        <View style={styles.inpuntsConteiner}>
                            <TextInput placeholder='Введите эл. почту' style={styles.input} numberOfLines={1} 
                                        placeholderTextColor='rgba(100, 72, 0, 0.7)'/>
                            <TextInput placeholder='Введите пароль' style={styles.input} numberOfLines={1} 
                                        placeholderTextColor='rgba(100, 72, 0, 0.7)'/>
                            <TextInput placeholder='Введите ник' style={styles.input} numberOfLines={1} 
                                        placeholderTextColor='rgba(100, 72, 0, 0.7)'/>
                        </View>

                        <View style={styles.changeGenderConteiner}>
                            <Text style={styles.changeGenderText}>Выберите пол</Text>
                            <View style={styles.genderConteiner}>
                                <View style={styles.genderItem}>
                                    <Image style={styles.genderImage} source={require('../img/icons/registerScreen/man.png')}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
          </ImageBackground>

      );
    }
  }

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContiner: {
        height: 60,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2
    },
    headerBtnBackConteiner: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBtnBack: {
        width: 50,
        height: 50,
    },
    headerTextConteiner: {
        width: width - 70,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: '#644800',
        fontSize: 28,
        letterSpacing: 0.7,
        textShadowColor: 'rgba(100, 72, 0, 0.6)',
        textShadowOffset: {width: 0, height: 4},
        textShadowRadius: 4
    },
    mainConteiner: {
        width: 240,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    inpuntsConteiner: {
        width: 240,
        marginTop: 15,
    },
    input: {
        fontSize: 17,
        color: '#644800',
        borderBottomColor: '#644800',
        borderBottomWidth: 2,
        textAlign: 'center',
        paddingBottom: 3,
        marginBottom: 10,
    },
    changeGenderConteiner: {
        width: 240,
        marginTop: 15,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    changeGenderText: {
        fontSize: 20,
        color: '#644800'
    },
    genderImage: {
        width: 42,
        height: 42
    },
    genderItem: {
        width: 50,
        height: 50,
        borderColor: '#E8BC4D',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
})

export default connect()(SignInScreen);