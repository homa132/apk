import React,{Component} from 'react';
import {View,Text,ImageBackground,StyleSheet,TouchableOpacity,Image,Dimensions,
    TextInput,ScrollView,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {setNewMyData} from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { StackActions } from 'react-navigation';
import InfoUser from '../detailsUser/infoAboutUsers'
import Ocenka from '../detailsUser/ocenka';

const { width, height } = Dimensions.get('window');

class Login extends Component{

    state = {
        telegrame: '',
        facebook: '',
        instagrame: '',
        webSite: '',
        save: false
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


    updateDataOnServer = async (data) => {
        const {nick,urlImg,aboutMe} = data;
        const heshUser = await AsyncStorage.getItem('userToken');
        
        await firebase.firestore().collection('users').doc(heshUser).update({
            nick,urlImg,aboutMe
        })
    }

    saveNewData = async () => {
        await this.setState({save: true})
        const {urlImg} = this.props.myData;
        this.props.setNewMyData('disableBtn');
        const img = urlImg.split(':')[0];
        if(img=='file'){
            const heshUser = await AsyncStorage.getItem('userToken');
            const image = await firebase.storage().ref().child(`usersImage/${heshUser}/userImg`).put(urlImg);
            await this.updateDataOnServer({...this.props.myData,urlImg:image.downloadURL});
        }else{
            await this.updateDataOnServer(this.props.myData);
        }
        this.setState({save: false})
    }

    render(){

        const {nick,ocenka,color,urlImg,myEvents,friends,myFriends,bal,position,aboutMe} = this.props.myData;
        const {disableSaveBtn}  = this.props;
        const {save} = this.state;

        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.headerConteiner}>
                            <TouchableOpacity style={[styles.btnSingOutConteiner,disableSaveBtn?{opacity:0.1}:{opacity: 1}]}
                                 onPress={this.saveNewData} disabled={disableSaveBtn}>
                                <Image source={require('../img/icons/btns/btnSave.png')} style={{width: 48,height: 48}}/>
                            </TouchableOpacity>

                            <TextInput numberOfLines={1} style={styles.headerText} value={nick} 
                                onChangeText={(value)=> this.props.setNewMyData('nick',value)}
                                />

                            <TouchableOpacity style={styles.btnSingOutConteiner} onPress={this._signOutAsync}>
                                <Image source={require('../img/icons/btns/btnSingOut.png')} style={{width: 48,height: 48}}/>
                            </TouchableOpacity>
                        </View>

                        <InfoUser my={true} color={color} urlImg={urlImg} myFriends={myFriends} friends={friends} myEvents={myEvents}
                                bal={bal} position={position}/>
                        <Ocenka my={true} ocenka={ocenka}/>

                        <View style={styles.detaisConteiner}>
                            <Text style={styles.detailsMainText}>Дополнительный данные о Вас</Text>

                            <TextInput numberOfLines={1} multiline={true} placeholder='Роскажите о себе' placeholderTextColor='#644800'
                                style={styles.aboutYou} value={aboutMe} onChangeText={(value)=>this.props.setNewMyData('aboutMe',value)}/>

                        </View>

                    </View>
                </ScrollView>
                {save?
                <View style={styles.saveConteiner}>
                    <View style={styles.save}>
                        <Text style={styles.saveText}>Именение Ваших данных</Text>
                        <ActivityIndicator size='large' color="rgba(255, 249, 96, 1)"/>
                    </View>
                </View>:null}
            </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    saveConteiner: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        width: 250,
        height: 170 ,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#FFF960',
        borderWidth: 4,
        backgroundColor: 'rgba(232, 188, 77, 0.7)',
        borderRadius: 20
    },
    saveText: {
        fontSize: 24,
        letterSpacing: 0.5,
        fontWeight: 'bold',
        color: 'rgba(100, 72, 0, 1)',
        width: 240,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
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
    headerText: {
        fontSize: 18,
        color: '#644800',
        borderColor:'#644800',
        borderWidth: 1.4,
        borderRadius: 10,
        width: width - 150,
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 5
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

mapStateToProps = (state) => {
    return{
        myData: state.data.myDataAcc,
        disableSaveBtn: state.data.disableSaveBtn
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        setNewMyData: (name,value,secondName)=>dispatch(setNewMyData(name,value,secondName))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);