import React,{Component} from 'react';
import {View,Text,ImageBackground,StyleSheet,TouchableOpacity,Image,Dimensions,
    TextInput,FlatList,ActivityIndicator,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {setNewMyData} from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { StackActions } from 'react-navigation';
import InfoUser from '../detailsUser/infoAboutUsers'
import Ocenka from '../detailsUser/ocenka';
import Event from '../detailsUser/eventUser';

const { width, height } = Dimensions.get('window');

class Login extends Component{

    constructor(props){
        super(props);
        let startArrayEvent = this.props.dataAbutMe.myEvents.filter((item,index) => index < 3)
        this.state = {
            save: false,
            eventsHesh: ['first',...startArrayEvent],
            lastEvent: 3
        }
    }

    addData = () => {
        const i = 3;
        const {eventsHesh,lastEvent} = this.state;
        console.log(this.props.dataAbutMe.myEvents);
        
        let arraEvent  = this.props.dataAbutMe.myEvents;
        

        if(arraEvent.length != 0){
            let array = arraEvent.filter((item,index) => lastEvent <= index&& index < lastEvent + i )
            this.setState({
                eventsHesh: [...eventsHesh,...array],
                lastEvent: lastEvent + i
            })
        }
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
            this.props.setNewMyData('urlImg',image.downloadURL)
            this.props.setNewMyData('saveData');

            await this.updateDataOnServer({...this.props.myData,urlImg:image.downloadURL});
        }else{
            await this.updateDataOnServer(this.props.myData);
        }
        this.setState({save: false})
    }

    render(){

        const {nick,ocenka,color,urlImg,myEvents,friends,myFriends,bal,position,aboutMe} = this.props.myData;
        const {disableSaveBtn}  = this.props;
        const {save,eventsHesh} = this.state;
        
        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={eventsHesh}
                    renderItem={({item,index}) => {
                        if(index == 0){
                            return (
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
                                        <TextInput numberOfLines={1} multiline={true} placeholder='Роскажите о себе' placeholderTextColor='#644800'
                                            style={styles.aboutYou} value={aboutMe} onChangeText={(value)=>this.props.setNewMyData('aboutMe',value)}/>
                                    </View>
                                </View>
                            )
                        }else{
                            return <Event hesh={item}/>
                        }
                    }}
                    onEndReachedThreshold={0.0001}
                    onEndReached={(info) => this.addData()} 
                />
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
        myData: state.data.myChangeDataAcc,
        disableSaveBtn: state.data.disableSaveBtn,
        dataAbutMe: state.data.myDataAcc
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        setNewMyData: (name,value,secondName)=>dispatch(setNewMyData(name,value,secondName))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);