import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,ImageBackground,Dimensions,ScrollView,
    ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import firebase from 'react-native-firebase';
import InfoUser from '../detailsUser/infoAboutUsers';
import Ocenka from '../detailsUser/ocenka';
import SocialLink from '../details/socialLink';


const { width, height } = Dimensions.get('window');

class DetailsUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            item: {},
            loader: true,
            add: true,
            disableBtnIfMyEvent: false,
            my:false,
            disableAdd: false
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        firebase.firestore().collection('users').doc(this.props.heshUser).get().then((item) => {
            this.setState({item:item.data(),loader: false});
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.item != this.state.item){
            const {myFriends,myHeshUser} = this.props;
            const {item} = this.state;
            const addOrRemove = myFriends.find((i) => {
                console.log(i.hesh , item.heshUser);
                
                return i.hesh == item.heshUser
            });
            const myEvent = myHeshUser == item.heshUser;

            if(myEvent){
                this.setState({disableBtnIfMyEvent: true})
            }
            if(addOrRemove){
                this.setState({add: false});
            }
        }
    }


    addInFrends = async () => {
        const {heshUser,friends,nick,urlImg} = this.state.item;
        const {myHeshUser,myFriends,myImgUser,myNickUser} = this.props;
        const {add} = this.state;
        
        if(add){
            this.setState({disableAdd: true,item: {...this.state.item, friends: [...friends,{hesh: myHeshUser,img: myImgUser,nick: myNickUser}]}});
            await firebase.firestore().collection('users').doc(heshUser).update({
                    friends: [...friends,{hesh: myHeshUser,img: myImgUser,nick: myNickUser}]
            })
            await firebase.firestore().collection('users').doc(myHeshUser).update({
                    myFriends: [...myFriends,{hesh: heshUser,img: urlImg,nick}]
            })
        }else{
            const newFriends = friends.filter(item=>item.hesh != myHeshUser);
            this.setState({disableAdd: true,item:{...this.state.item,friends: newFriends}});
            await firebase.firestore().collection('users').doc(heshUser).update({
                friends: [...newFriends]
           });
           const newMyFriends = myFriends.filter(item=>item.hesh != heshUser);
           await firebase.firestore().collection('users').doc(myHeshUser).update({
            myFriends: [...newMyFriends]
            })
        }
        this.setState({disableAdd: false,add: !add});
    }

    render(){
        const {color,urlImg,myFriends,friends,myEvents,bal,position,ocenka,contacts,heshUser,nick,aboutMe} = this.state.item;
        const {disableBtnIfMyEvent,disableAdd} = this.state;
        console.log(this.state);
        
        return(
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                {this.state.loader?
                <View style={{width: width,height: height,justifyContent:'center',alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#644800" />
                </View>:
                <ScrollView>
                    <View style={styles.conteiner}>
                        <View style={styles.headerConteiner}>
                            <TouchableOpacity style={styles.headerBtnConteiner} onPress={()=>this.props.navigation.goBack()}>
                                <Image source={require('../img/icons/btns/btnBack.png')} style={styles.headerBtnImg}/>
                            </TouchableOpacity>
                            <Text numberOfLines={1} style={styles.headerText}>{nick}</Text>
                            <TouchableOpacity style={styles.headerBtnConteiner} disabled={disableBtnIfMyEvent}>
                                <Image source={require('../img/icons/btns/messenger.png')} style={styles.headerBtnImg}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainConteiner}>
                            <InfoUser color={color} urlImg={urlImg} myFriends={myFriends} friends={friends} myEvents={myEvents}
                                bal={bal} position={position}/>
                            <View style={styles.ocenkaConteiner}>
                                <Ocenka ocenka={ocenka}  heshUser={heshUser} my={disableBtnIfMyEvent}/>
                                {this.state.add?
                                    <TouchableOpacity onPress={this.addInFrends} disabled={disableBtnIfMyEvent || disableAdd}>
                                        <Image style={{width: 50,height: 50}} source={require('../img/icons/detailsPersonalAcc/btnAdd.png')}/>
                                    </TouchableOpacity>:
                                    <TouchableOpacity onPress={this.addInFrends} >
                                        <Image style={{width: 50,height: 50}} source={require('../img/icons/detailsPersonalAcc/btnDelete.png')}/>
                                    </TouchableOpacity>
                                }

                            </View>
                            <Text style={styles.moreText}>{aboutMe}</Text>
                        </View>
                    </View>
                </ScrollView>
                }
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%'
    },
    headerConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 60,
        borderBottomColor: '#644800',
        borderBottomWidth: 3,
        justifyContent: 'space-between'
    },
    headerBtnImg: {
        width: 50,
        height: 50
    },
    headerBtnConteiner: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextConteiner: {
        width: width - 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    headerText: {
        fontSize: 22,
        color: '#644800',
        letterSpacing: 0.5
    },
    mainConteiner: {
        width: width,
        alignItems: 'center',
        paddingTop: 10
    },
    ocenkaConteiner: {
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    moreText: {
        width: width -40,
        fontSize: 16,
        color: '#644800',
        marginTop: 10
    },
    socialLinkConnteiner: {
        height: 140,
        justifyContent: 'center',
        alignItems: "center"
    }
})

const mapStateToProps = (state) => {
    return {
        heshUser: state.navigation.hestUser,
        myFriends: state.data.myDataAcc.myFriends,
        myHeshUser: state.data.myDataAcc.heshUser,
        myNickUser: state.data.myDataAcc.nick,
        myImgUser:  state.data.myDataAcc.urlImg
    }
  }

export default connect(mapStateToProps)(withNavigation(DetailsUser));

