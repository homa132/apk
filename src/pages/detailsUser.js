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
            my:false
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = async () => {
        this.searchData = await firebase.firestore().collection('users').doc(this.props.heshUser).onSnapshot((doc)=>{
            const data = doc.data();
            this.setState({item:data,loader: false});
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.item != this.state.item){
            const {myFriends,myHeshUser} = this.props;
            const {item} = this.state;
            const addOrRemove = myFriends.find((i) => i == item.heshUser);
            const myEvent = myHeshUser == item.heshUser;
            if(myEvent){
                this.setState({disableBtnIfMyEvent: true})
            }
            if(addOrRemove){
                this.setState({add: false});
            }
        }
    }

    componentWillUnmount(){
        this.searchData();
    }

    addInFrends = async () => {
        const {heshUser,friends} = this.state.item;
        const {myHeshUser,myFriends} = this.props;
        const {add} = this.state;
        if(add){
           await firebase.firestore().collection('users').doc(heshUser).update({
                friends: [...friends,myHeshUser]
           })
           await firebase.firestore().collection('users').doc(myHeshUser).update({
                myFriends: [...myFriends,heshUser]
           })
        }else{
            const newFriends = friends.filter(item=>item != myHeshUser);
            await firebase.firestore().collection('users').doc(heshUser).update({
                friends: [...newFriends]
           });
           this.setState({item:{...this.state.item,friends: newFriends}});
           const newMyFriends = myFriends.filter(item=>item != heshUser);
           await firebase.firestore().collection('users').doc(myHeshUser).update({
            myFriends: [...newMyFriends]
            })
        }
        this.setState({add: !add});
    }

    render(){
        const {color,urlImg,myFriends,friends,myEvents,bal,position,ocenka,contacts,heshUser,nick,aboutMe} = this.state.item;
        const {disableBtnIfMyEvent} = this.state;

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
                            <TouchableOpacity style={styles.headerBtnConteiner}>
                                <Image source={require('../img/icons/btns/messenger.png')} style={styles.headerBtnImg}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainConteiner}>
                            <InfoUser color={color} urlImg={urlImg} myFriends={myFriends} friends={friends} myEvents={myEvents}
                                bal={bal} position={position}/>
                            <View style={styles.ocenkaConteiner}>
                                <Ocenka ocenka={ocenka}  heshUser={heshUser} my={disableBtnIfMyEvent}/>
                                {this.state.add?
                                    <TouchableOpacity onPress={this.addInFrends} disabled={disableBtnIfMyEvent}>
                                        <Image style={{width: 50,height: 50}} source={require('../img/icons/detailsPersonalAcc/btnAdd.png')}/>
                                    </TouchableOpacity>:
                                    <TouchableOpacity onPress={this.addInFrends} >
                                        <Image style={{width: 50,height: 50}} source={require('../img/icons/detailsPersonalAcc/btnDelete.png')}/>
                                    </TouchableOpacity>
                                }

                            </View>
                            <Text style={styles.moreText}>{aboutMe}</Text>
                            <View style={styles.socialLinkConnteiner}>
                                <SocialLink contacts={contacts}/>
                            </View>
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
        myHeshUser: state.data.myDataAcc.heshUser
    }
  }

export default connect(mapStateToProps)(withNavigation(DetailsUser));

