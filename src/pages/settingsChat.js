import React,{Component} from 'react';
import {View,ImageBackground,FlatList,Text,Image,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');

class SettingsChat extends Component {

    constructor(props){
        super(props);
        this.state = {
            alert: true
        }
    }

    render(){
        const {alert} = this.state;

        return (
            <ImageBackground style={{width: '100%',height: '100%'}} source={require('../img/background/background1.jpg')}>
                <FlatList
                data={['first','first','first','first','first','first','first','first','first','first','first','first','last']}
                renderItem={({item,index}) => {
                    if(index == 0){
                        return (
                            <View style={styles.conteiner}>
                                <View style={styles.headerConteiner}>
                                    <TouchableOpacity style={{width: 60,height: 60,justifyContent: 'center',alignItems: 'center'}}>
                                        <Image style={{width: 50,height: 50,transform: [{rotate: '180deg'}]}}  source={require('../img/icons/btns/btnMore.png')}/>
                                    </TouchableOpacity>
                                    <View style={styles.headerTextConteiner}>
                                        <Text style={styles.textHeader}>name chat</Text>
                                    </View>
                                </View>
                                <View style={styles.btnsConteiner}>
                                    <TouchableOpacity>
                                        <Image source={require('../img/icons/btns/btnLeaveChat.png')} style={styles.btnImage}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={require('../img/icons/btns/addUserInChat.png')} style={styles.btnImage}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({alert: !alert})}>
                                        {alert?
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
                                    <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/project-99846.appspot.com/o/testImage.png?alt=media&token=e4ac9402-dc9d-4621-b886-9c0ace7d903b'}} style={styles.imgUser}/>
                                    <Text style={styles.itemText}>{item}</Text>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between',width: 110,alignItems: 'center'}}>
                                        <TouchableOpacity>
                                            <Image source={require('../img/icons/btns/btnDelete.png')} style={styles.btnMore}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Image source={require('../img/icons/btns/btnMore.png')} style={styles.btnMore}/>
                                        </TouchableOpacity>
                                    </View>
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
    headerConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
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
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7
    },
    btnMore: {
        width: 50,
        height: 50
    },
})


export default connect()(withNavigation(SettingsChat));