import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Dimensions,TextInput,ImageBackground,Image,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase'
import { GoogleSignin } from 'react-native-google-signin';

const { width, height } = Dimensions.get('window');


class SignInScreen extends Component {

    state = {
        login: '',
        password: '',
        error: false,
        disabledBtn: true
    }

    componentDidUpdate(){
        const {login,password,disabledBtn} = this.state;

        if(login=='' || password==''){
            disabledBtn?null:this.setState({disabledBtn:true});
        }else{
            disabledBtn?this.setState({disabledBtn:false}):null;
        }
    }

    _signInAsync = async () => {
        try{
            const {login,password} = this.state;
            const singInFirebase = await firebase.auth().signInWithEmailAndPassword(login,password);
                await AsyncStorage.setItem('userToken', singInFirebase.user.uid);
                this.props.navigation.navigate('App');
    
        }catch(error){
            this.setState({error:true,password: ''})
        }
      
      };
    
      singInGoogle = async () => {
        try {
            await GoogleSignin.configure({
                scopes: ['https://www.googleapis.com/auth/drive.readonly'],
                webClientId: '804058946664-j1gqhi7n11gj22aufph5omht1p0bjct8.apps.googleusercontent.com'
            });
        
            const data = await GoogleSignin.signIn();

            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

            const register = await firebase.auth().signInWithCredential(credential);
            await firebase.firestore().collection('users').doc(register.user.uid).set({email:register.user.email,
                name:register.user.displayName,heshUser:register.user.uid,urlImg:register.user.photoURL,gender: 'default'});
            await AsyncStorage.setItem('userToken', register.user.uid);
            await this.props.navigation.navigate('App');
            

        
          } catch (e) {
            console.log(e);
          }
      }


    render() {
        const {login,password,error,disabledBtn} = this.state;


      return (
          <ImageBackground source={require('../img/background/background1.jpg')} style={{width: '100%', height: '100%'}}>
            <ScrollView style={{width: width}}>

                <View style={styles.conteiner}>

                        <View style={styles.logoConteiner}>
                            <Image source={require('../img/icons/logo/logo.png')} />
                        </View>

                        <View style={styles.singInWithConteiner}>
                            <Text style={styles.singInWithText}>Войдите с помощю:</Text>
                            <TouchableOpacity style={styles.singInWithBtnConteiner} onPress={this.singInGoogle}>
                                <Image source={require('../img/icons/singInScreen/google.png')} style={styles.singInWithImg}/>
                            </TouchableOpacity>
                        </View>

                            <TextInput placeholder='Введите эл. почту' style={[styles.input,{marginTop:40,textAlign: 'center',}]} 
                                        placeholderTextColor='rgba(100, 72, 0, 0.7)'
                                        value={login} onChangeText={(login)=>this.setState({login})} autoCapitalize='none' 
                                        maxLength={40} autoCompleteType='email' keyboardType='email-address' />
                            
                            <TextInput placeholder='Введите пароль' style={styles.input} placeholderTextColor='rgba(100, 72, 0, 0.7)'
                                        value={password} onChangeText={(password)=>this.setState({password})}
                                        maxLength={30} autoCapitalize='none' autoCompleteType='password' 
                                        secureTextEntry={true} />
                        

                        {error?<Text style={{color:'red'}}>Неверно введенные данные</Text>:null}

                        <View style={styles.btnsConteiner}>
                            <TouchableOpacity onPress={this._signInAsync} disabled={disabledBtn}>
                                <View style={[styles.btnConteiner, disabledBtn?{opacity:0.5}:null]}>
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
        alignItems: 'center',
        marginTop: 15
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