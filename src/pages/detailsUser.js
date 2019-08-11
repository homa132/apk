import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,ImageBackground,Dimensions,FlatList,
    ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import firebase from 'react-native-firebase';
import InfoUser from '../detailsUser/infoAboutUsers';
import Ocenka from '../detailsUser/ocenka';
import Event from '../detailsUser/eventUser';
import {setActiveItem} from '../redux/actions';

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
            disableAdd: false,
            eventsHesh: ['first'],
            lastEvent: 2,
            arrayEvent: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        firebase.firestore().collection('users').doc(this.props.heshUser).get().then((item) => {
            const data = item.data();
            let startArrayEvent = data.myEvents.filter((item,index) => index < 2)

            this.setState({item:data,loader: false,arrayEvent: data.myEvents,
                eventsHesh: ['first',...startArrayEvent]
            });
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.item != this.state.item){
            const {myFriends,myHeshUser} = this.props;
            const {item} = this.state;
            const addOrRemove = myFriends.find((i) => {
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
                    friends: firebase.firestore.FieldValue.arrayUnion({hesh: myHeshUser,img: myImgUser,nick: myNickUser})
            })
            await firebase.firestore().collection('users').doc(myHeshUser).update({
                    myFriends: firebase.firestore.FieldValue.arrayUnion({hesh: heshUser,img: urlImg,nick})
            })
        }else{
            const removeData = {hesh: myHeshUser,img: myImgUser,nick: myNickUser}
            const newFriends = friends.filter(item=>item.hesh != myHeshUser);

            this.setState({disableAdd: true,item:{...this.state.item,friends: newFriends}});
            await firebase.firestore().collection('users').doc(heshUser).update({
                friends: firebase.firestore.FieldValue.arrayRemove(removeData)
           });

           const removeSecondData = {hesh: heshUser,img: urlImg,nick};
           await firebase.firestore().collection('users').doc(myHeshUser).update({
            myFriends: firebase.firestore.FieldValue.arrayRemove(removeSecondData)
            })
        }
        this.setState({disableAdd: false,add: !add});
    }

    addData = () => {
        const i = 2;
        const {eventsHesh,lastEvent,arrayEvent} = this.state;
        let arraEvent  = arrayEvent;

        if(arraEvent.length != 0){
            let array = arraEvent.filter((item,index) => lastEvent <= index&& index < lastEvent + i )
            this.setState({
                eventsHesh: [...eventsHesh,...array],
                lastEvent: lastEvent + i
            })
        }
    }


    newChat = async () => {
        const {myHeshUser,myNickUser,myImgUser,myColor} = this.props;
        const {heshUser,nick,urlImg,color} = this.state.item;
        
        const dateCreate = new Date();
        let arrayUsers;
        if(heshUser < myHeshUser){
            arrayUsers = [heshUser,myHeshUser]
        }else{
            arrayUsers = [myHeshUser,heshUser]
        }

        const searchChat = await firebase.firestore().collection('chats').where('event','==',false)
            .where('arrayUsers','=',arrayUsers).get();


        if(searchChat.docs.length == 0){

            const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);

            const newChat = {
                heshMessenger: token,
                lastMess: dateCreate.getTime(),
                event: false,
                arrayUsers: arrayUsers,
                users: [
                {
                    autorHesh:myHeshUser,
                    autorImage:myImgUser,
                    autorNick: myNickUser,
                    autorColor: myColor
                },
                {
                    autorHesh:heshUser,
                    autorImage: urlImg,
                    autorNick: nick,
                    autorColor: color
                }
                ]
            };

            const createNewChat = await firebase.firestore().collection('chats').doc(token).set(newChat);
    
            await firebase.firestore().collection('users').doc(myHeshUser).update({
                myMessengers: firebase.firestore.FieldValue.arrayUnion({
                    alert: true,
                    hesh: token,
                    newMess: false,
                })
            })
            
            await firebase.firestore().collection('users').doc(heshUser).update({
                myMessengers: firebase.firestore.FieldValue.arrayUnion({
                    alert: true,
                    hesh: token,
                    newMess: false,
                })
            })
    
            await firebase.firestore().collection('chats').doc(token).collection('messege').add({
                messege: 'hello it is first messege',
                autor: {
                    autorImage:myImgUser,autorHesh:myHeshUser
                },
                date: '20.02.2019 10-50:50',
                dateCreate: dateCreate.getTime()
            })

            this.props.setActiveItem('heshChat',token);
            this.props.setActiveItem('dataChat',newChat);
            this.props.navigation.push('Messenger');

        }else{
            searchChat.forEach(item => {
                this.props.setActiveItem('heshChat',item.id);
                this.props.setActiveItem('dataChat',item.data());
                this.props.navigation.push('Messenger');
            })
        }

    }


    render(){
        const {color,urlImg,myFriends,friends,myEvents,bal,position,one,two,three,four,five,heshUser,nick,aboutMe} = this.state.item;
        const {disableBtnIfMyEvent,disableAdd,eventsHesh} = this.state;
        
        return(
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                {this.state.loader?
                <View style={{width: width,height: height,justifyContent:'center',alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#644800" />
                </View>:
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={eventsHesh}
                    onEndReachedThreshold={0.0001}
                    onEndReached={(info) => this.addData()} 
                    renderItem={({item,index}) => {
                        if(index == 0){
                            return (
                                <View style={styles.conteiner}>
                                    <View style={styles.headerConteiner}>
                                        <TouchableOpacity style={styles.headerBtnConteiner} onPress={()=>this.props.navigation.goBack()}>
                                            <Image source={require('../img/icons/btns/btnBack.png')} style={styles.headerBtnImg}/>
                                        </TouchableOpacity>
                                        <Text numberOfLines={1} style={styles.headerText}>{nick}</Text>
                                        <TouchableOpacity style={styles.headerBtnConteiner} disabled={disableBtnIfMyEvent} onPress={this.newChat}>
                                            <Image source={require('../img/icons/btns/messenger.png')} style={styles.headerBtnImg}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.mainConteiner}>
                                        <InfoUser color={color} urlImg={urlImg} myFriends={myFriends} friends={friends} myEvents={myEvents}
                                            bal={bal} position={position}/>
                                        <View style={styles.ocenkaConteiner}>
                                            <Ocenka one={one} two={two} three={three} four={four} five={five}  heshUser={heshUser} my={disableBtnIfMyEvent}/>
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
                            )
                        }else{
                            return (<Event hesh={item}/>)
                        }
                    }}
                />
                   
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
        myImgUser:  state.data.myDataAcc.urlImg,
        myColor: state.data.myDataAcc.color,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (name,value) => dispatch(setActiveItem(name,value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(DetailsUser));

