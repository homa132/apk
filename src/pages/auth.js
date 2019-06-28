import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import GoogleI from '../icon/register/googleI.svg';
import FacebookI from '../icon/register/facebookI.svg';

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
        <View style={styles.conteiner}>
            <View style={styles.headerConteiner}>
                <Text style={styles.headerText}>
                Авторизация
                </Text>
            </View>

            <View style={styles.mainConteiner}>
                <TextInput placeholder='Электронный адрес' value={this.state.login} 
                    onChangeText={(login) => this.setState({login})}
                    style={styles.inputs}/>
                <TextInput placeholder='Пароль' value={this.state.password} 
                    onChangeText={(password) => this.setState({password})}
                    style={styles.inputs}/>


                <TouchableOpacity style={styles.buttonConteiner} onPress={this._signInAsync}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',width: width - 60,height:10}}>
                    <View style={{width: 100,heigth: 1,borderWidth:1,borderColor:'#13D9D9'}}/>
                    <Text style={{fontSize: 18,color: '#5F5F5F',letterSpacing:1}}>или</Text>
                    <View style={{width: 100,heigth: 1,borderWidth:1,borderColor:'#13D9D9'}}/>
                </View>
                
                <Text style={{fontSize: 17, color: '#000000',marginTop: 25}}>
                Войти при помощи соцсетей
                </Text>

                <View style={{marginTop: 20,flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',width: 170}}>
                    <TouchableOpacity>
                        <GoogleI/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FacebookI/>
                    </TouchableOpacity>
                </View>

                <Text style={{fontSize: 14,marginTop: 25, color:'#000000',marginTop:30}}>Еще нет аккаунта?</Text>

                <TouchableOpacity style={styles.registerConteiner} onPress={()=>this.props.navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Зарегестрируйтесь</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerConteiner: {
        width: width,
        height: 60,
        justifyContent: 'center',
        borderBottomColor: '#13D9D9',
        borderBottomWidth: 2,
        alignItems: 'center',
    },
    headerText: {
        color: '#000000',
        fontSize: 25,
        textShadowColor: '#656565',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 50,
    },
    mainConteiner: {
        width: width - 60,
        marginTop: 30,
        alignItems: 'center'
    },
    inputs: {
        borderBottomColor: '#13D9D9',
        borderBottomWidth: 1,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 17,
        width: 280
    },
    buttonConteiner: {
        width: 280,
        height: 40,
        backgroundColor: '#13D9D9',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 30,

    },
    buttonText: {
        fontSize: 20,
        color: '#555555'
    },
    registerConteiner: {
        width: 280,
        borderRadius: 15,
        backgroundColor: '#00B775',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    registerText: {
        color: '#FFFFFF',
        fontSize: 20
    }
})

export default connect()(SignInScreen);