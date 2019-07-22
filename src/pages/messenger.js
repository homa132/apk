import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity,Image,ImageBackground,KeyboardAvoidingView,FlatList} from 'react-native';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');

class Messenger extends Component {

    render(){
        return (
            <ImageBackground style={{width: width,height: height}} source={require('../img/background/background1.jpg')}>
                <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled >
                    <View style={styles.headerConteiner}>
                        <TouchableOpacity style={styles.headerBtnConteiner}>
                            <Image source={require('../img/icons/btns/btnBack.png')} style={styles.headerBtn}/>
                        </TouchableOpacity>

                        <Text style={styles.headerText} numberOfLines={1}>Название чата</Text>

                        <TouchableOpacity style={styles.headerBtnConteiner}>
                            <Image source={require('../img/icons/btns/btnDetailsChat.png')} style={styles.headerBtn}/>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={['a','a','a','a','a','a','a','a','a','a','a','a','a','6','5','4']}
                        renderItem={({item})=><Text style={styles.headerText} numberOfLines={1}>Название чата{item}</Text>}
                        style={{width: width,height: height - 190}}
                    />



                    <View style={styles.bottomConteiner}>
                        <TextInput placeholder='Сообщение' style={styles.input} placeholderTextColor='#E8BC4D'/>
                        <TouchableOpacity style={styles.btnMessConteiner}>
                            <Image source={require('../img/icons/btns/btnMesseng.png')} style={styles.btnMess}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </ImageBackground>
           
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        width: width - 80,
        color: '#644800',
        fontSize: 17
    },
    btnMessConteiner: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomConteiner: {
        width: width,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderColor: '#644800',
        borderWidth: 1.4,
        borderRadius: 5,
        position: 'absolute',
        left: 0,
        top: height - 128
    },
    btnMess: {
        width: 40,
        height: 40
    },
    headerConteiner: {
        height: 60,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
    },
    headerBtn: {
        width: 50,
        height: 50
    },
    headerBtnConteiner: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: '#644800',
        fontSize: 20,
        letterSpacing: 0.5
    }
})

export default connect()(Messenger);