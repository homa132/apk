import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,Image,FlatList,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {setActiveItem} from '../redux/actions';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');

class Friends extends Component {

    state = {
        comlete: false
    }

    render(){
        return (
            <ImageBackground style={{width:width, height: height - 73}} source={require('../img/background/background1.jpg')}>
                {this.state.comlete?
                <View style={styles.completeConteiner}>
                    <Text style={styles.completeText}>Приглашение отправлено</Text>
                </View>
                :
                null}
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={['first',...this.props.arrayFrineds]}
                    renderItem={({item,index}) => {
                        if(index == 0 ){
                            return (
                                <View style={styles.searchConteiner}>
                                    <TouchableOpacity style={styles.btnBackConteiner} onPress={() => this.props.navigation.goBack()}>
                                        <Image source={require('../img/icons/btns/btnBack.png')} style={styles.searchImage}/>
                                    </TouchableOpacity>
                                    {this.props.messege?
                                    <View style={styles.headerTextConteiner}>
                                        <Text style={styles.headerText}>Ваши подписчики</Text>
                                    </View>:
                                    <View style={styles.headerTextConteiner}>
                                        <Text style={styles.headerText}>Пользователи</Text>
                                    </View>
                                    }
                                </View>
                            )
                        }else{
    
                            return (
                                <View style={styles.conteinerItem}>
                                    <Image source={{uri: item.img}} style={styles.imgUser}/>
                                    <Text style={styles.itemText}>{item.nick}</Text>
                                    <TouchableOpacity style={styles.btnMoreConteiner} onPress={async () => {
                                        if(this.props.messege){
                                            let arrayUsers;
                                            if(item.hesh < this.props.myHeshUser){
                                                arrayUsers = [item.hesh,this.props.myHeshUser]
                                            }else{
                                                arrayUsers = [this.props.myHeshUser,item.hesh]
                                            }
                                            const dateCreate = new Date();
    
                                            const searchChat = await firebase.firestore().collection('chats').where('event','==',false)
                                                .where('arrayUsers','==',arrayUsers).get();
                                                
                                                if(searchChat.docs.length == 0){
                                                    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
                                                    
                                                    const newChat = {
                                                        heshMessenger: token,
                                                        lastMess: dateCreate.getTime(),
                                                        event: false,
                                                        arrayUsers: arrayUsers,
                                                        noAlert: [],
                                                        users: [
                                                        {
                                                            autorHesh: this.props.myHeshUser,
                                                            autorImage: this.props.myImgUser,
                                                            autorNick: this.props.myNickUser,
                                                            autorColor: this.props.myColor
                                                        },
                                                        {
                                                            autorHesh:item.hesh,
                                                            autorImage:  item.img,
                                                            autorNick: item.nick,
                                                            autorColor: item.color
                                                        }
                                                        ]
                                                    };
                                        
                                                    await firebase.firestore().collection('chats').doc(token).set(newChat);
                                        
                                                    await firebase.firestore().collection('users').doc(this.props.myHeshUser).update({
                                                        myMessengers: firebase.firestore.FieldValue.arrayUnion({
                                                            hesh: token,
                                                        })
                                                    });
                                                    
                                                    await firebase.firestore().collection('users').doc(item.hesh).update({
                                                        myMessengers: firebase.firestore.FieldValue.arrayUnion({
                                                            hesh: token,
                                                        })
                                                    })
                                            
                                                    await firebase.firestore().collection('chats').doc(token).collection('messege').add({
                                                        messege: 'hello it is first messege',
                                                        autor: {
                                                            autorImage:this.props.myImgUser,autorHesh:this.props.myHeshUser
                                                        },
                                                        date: '20.02.2019 10-50:50',
                                                        dateCreate: dateCreate.getTime()
                                                    })
    
                                                    await firebase.firestore().collection('chats').doc(token).collection('messege').add({
                                                        messege: this.props.eventHeshForMessege,
                                                        autor: {
                                                            autorImage:this.props.myImgUser,autorHesh:this.props.myHeshUser
                                                        },
                                                        date: '20.02.2019 10-50:50',
                                                        dateCreate: dateCreate.getTime(),
                                                        event: true
                                                    })
                                                    this.setState({comlete: true});
                                                    setTimeout(() => {this.props.navigation.goBack()},
                                                    4000)
                                                }else{
                                                    searchChat.forEach(item => {
                                                        firebase.firestore().collection('chats').doc(item.id).collection('messege').add({
                                                            messege: this.props.eventHeshForMessege,
                                                            autor: {
                                                                autorImage:this.props.myImgUser,autorHesh:this.props.myHeshUser
                                                            },
                                                            date: '20.02.2019 10-50:50',
                                                            dateCreate: dateCreate.getTime(),
                                                            event: true
                                                        }).then(() => {
                                                            this.setState({comlete: true});
                                                            setTimeout(() => {this.props.navigation.goBack()},
                                                            4000)
                                                        })
                                                    })

                                                }
                                            
                                        }else{
                                            this.props.setActiveItem('hestUser',item.hesh);
                                            this.props.navigation.push('DetailsUser')
                                        }
                                    }}>
                                        <Image source={require('../img/icons/btns/btnMore.png')} style={styles.btnMore}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    }}
                />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    conteinerItem: {
        justifyContent: 'space-between',
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        height: 65,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
        paddingHorizontal: 15
    },
    imgUser: {
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7
    },
    itemText: {
        fontSize: 20,
        color: '#644800',
    },
    btnMore: {
        width: 50,
        height: 50
    },
    btnMoreConteiner: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: width,
        borderBottomColor: '#644800',
        borderBottomWidth: 2,
        marginTop: 5,
        paddingHorizontal: 5
    },
    searchImage: {
        width: 50,
        height: 50,
    },
    searchInput: {
        width: width -130,
        height: 50,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 1.8,
        color: '#644800',
        fontSize: 18,
    },
    btnBackConteiner: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#644800'
    },
    headerTextConteiner: {
        width: width - 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    completeConteiner: {
        width: 250,
        height: 70,
        position: 'absolute',
        top: height/2 -70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderColor:'#E8BC4D',
        borderWidth: 2,
        borderRadius: 15,
        left: (width-250)/2
    },
    completeText: {
        fontSize: 25,
        color: '#644800',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

mapStateToProps = (state) => {
    return {
        arrayFrineds: state.navigation.arrayFriends,
        messege: state.navigation.messege,
        eventHeshForMessege: state.navigation.eventHeshForMessege,
        myHeshUser: state.data.myDataAcc.heshUser,
        myNickUser: state.data.myDataAcc.nick,
        myImgUser:  state.data.myDataAcc.urlImg,
        myColor: state.data.myDataAcc.color,
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (name,value) => dispatch(setActiveItem(name,value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(Friends));