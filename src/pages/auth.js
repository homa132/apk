import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions,TextInput,ImageBackground,Image,ScrollView,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'

const { width, height } = Dimensions.get('window');


class SignInScreen extends Component {

    state = {
        login: '',
        password: '',
    }


    _signInAsync = async () => {
        const {login,password} = this.state;
        const singInFirebase = await firebase.auth().signInWithEmailAndPassword(login,password).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
          });
        await AsyncStorage.setItem('userToken', singInFirebase.user.uid);
        this.props.navigation.navigate('App');
      };
    
      singInGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider ();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token,user);
            
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }

    render() {
        const {login,password} = this.state;
      return (
          <ImageBackground source={require('../img/background/background1.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView style={{width: width}}>

                <View style={styles.conteiner}>

                        <View style={styles.logoConteiner}>
                            <Image source={require('../img/icons/logo/logo.png')} />
                        </View>

                        <View style={styles.singInWithConteiner}>
                            <Text style={styles.singInWithText}>Войдите с помощю:</Text>
                            <View style={styles.singInWithBtnsConteiner}>
                                <TouchableOpacity style={styles.singInWithBtnConteiner} onPress={this.singInGoogle}>
                                    <Image source={require('../img/icons/singInScreen/google.png')} style={styles.singInWithImg}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.singInWithBtnConteiner}>
                                    <Image source={require('../img/icons/singInScreen/facebook.png')} style={styles.singInWithImg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                            <TextInput placeholder='Введите эл. почту' style={[styles.input,{marginTop:40,textAlign: 'center',}]} placeholderTextColor='rgba(100, 72, 0, 0.7)'
                                            value={login} onChangeText={(login)=>this.setState({login})}/>
                            
                            <TextInput placeholder='Введите пароль' style={styles.input} placeholderTextColor='rgba(100, 72, 0, 0.7)'
                                        value={password} onChangeText={(password)=>this.setState({password})}
                                        maxLength={50}/>

                        <View style={styles.btnsConteiner}>
                            <TouchableOpacity onPress={this._signInAsync}>
                                <View style={styles.btnConteiner}>
                                    <Text style={styles.btnText}>Войти</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                                <View style={[styles.btnConteiner,{width: 200,marginTop:20}]}>
                                    <Text style={styles.btnText}>Регистрация</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>
            </ScrollView>
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
    logoConteiner: {
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 30
    },
    logoImg: {
        width: 163,
        height: 115
    },
    singInWithConteiner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    singInWithText: {
        fontSize: 24,
        color: '#644800'
    },
    singInWithBtnsConteiner: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        marginTop: 20
    },
    singInWithBtnConteiner: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singInWithImg: {
        width: 70,
        height: 70,
    },
    inputsConteiner: {
        width: 240,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40
    },
    input: {
        fontSize: 20,
        color: '#644800',
        borderBottomColor: '#644800',
        borderBottomWidth: 2,
        textAlign: 'center',
        paddingBottom: 3,
        marginBottom: 20,
        paddingTop: 0,
        width: 240,
        marginBottom: 30
    },
    btnsConteiner: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    btnText: {
        fontSize: 20,
        color: '#644800',
    },
    btnConteiner: {
        width: 140,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E8BC4D',
        borderWidth:4,
        backgroundColor:'rgba(255, 249, 96, 0.3)',
        borderRadius: 20,
    }
})

export default connect()(SignInScreen);