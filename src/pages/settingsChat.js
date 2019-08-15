import React from 'react';
import {View,ImageBackground,FlatList,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');

const settings = (props) =>  (
            <ImageBackground style={{width: '100%',height: '100%'}} source={require('../img/background/background1.jpg')}>
                <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={['first',...props.users]}
                renderItem={({item,index}) => {
                    if(index == 0){
                        return (
                            <View style={styles.conteiner}>
                                <View style={styles.headerConteiner}>
                                    <TouchableOpacity style={{width: 60,height: 60,justifyContent: 'center',alignItems: 'center'}} 
                                        onPress={()=>props.back()}>
                                        <Image style={{width: 50,height: 50,transform: [{rotate: '180deg'}]}}  source={require('../img/icons/btns/btnMore.png')}/>
                                    </TouchableOpacity>
                                    <View style={styles.headerTextConteiner}>
                                        <Text style={styles.textHeader}>настройки</Text>
                                    </View>
                                </View>
                                <View style={styles.btnsConteiner}>
                                    <TouchableOpacity disabled={!props.event} style={props.event?{opacity: 1}:{opacity: 0.2}}>
                                        <Image source={require('../img/icons/btns/addUserInChat.png')} style={styles.btnImage}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.alert()}>
                                        {props.alertData?
                                        <Image source={require('../img/icons/btns/btnAlertTrue.png')} style={styles.btnImage}/>:
                                        <Image source={require('../img/icons/btns/btnAlertFalse.png')} style={styles.btnImage}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }else{
                        return (
                            <View style={styles.conteinerItem}>
                                <View style={[styles.imageUserConteiner,{backgroundColor: item.autorColor}]}>
                                    <Image source={{uri: item.autorImage}} style={styles.imgUser}/>
                                </View>
                                <Text style={styles.itemText}>{item.autorNick}</Text>
                                <TouchableOpacity onPress={()=> props.goToUser(item.autorHesh)}>
                                    <Image source={require('../img/icons/btns/btnMore.png')} style={styles.btnMore}/>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }}
                />

            </ImageBackground>
        )

const styles = StyleSheet.create({
    headerConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: width,
        paddingHorizontal: 10,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2
    },
    textHeader: {
        color: '#644800',
        fontSize: 22,
        marginRight: 2.5,
        fontWeight: 'bold'
    },
    headerTextConteiner: {
        width: width - 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conteiner: {
        flex: 1,
        alignItems: 'center'
    },
    btnsConteiner: {
        width: width,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    btnImage: {
        width: 60,
        height: 70
    },
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
    itemText: {
        fontSize: 20,
        color: '#644800',
    },
    imgUser: {
        width: 48,
        height: 48,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7
    },
    btnMore: {
        width: 50,
        height: 50
    },
    imageUserConteiner: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    }
})


export default settings;