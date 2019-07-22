import React from 'react';
import {View,StyleSheet,Image,Text,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

const { width, height } = Dimensions.get('window');

function ChatPeople(props){

    return(
        <View style={styles.chatPeopleConteiner}>
            <View style={styles.imageAutorConteinerSecond}>
                <Image style={styles.imagePeople} source={require('../img/testImage.png')}/>
            </View>
            <View style={styles.chatPeopleTextConteiner}>
                <Text style={styles.chatPeopleAutorText} numberOfLines={1}>nik_name cdsvsd</Text>
                <Text style={styles.chatPeopleMessegText} numberOfLines={2}>nik_name: привет!</Text>
            </View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Messenger')}>
                <Image style={styles.imageMessenger} source={require('../img/icons/btns/messenger.png')}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    chatPeopleConteiner: {
        width: width,
        height:85,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    imagePeople: {
        width: 60,
        height: 60,
        borderRadius: 7,
        borderColor: 'white',
        borderWidth: 1
    },
    imageAutorConteinerSecond: {
        width:65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 7
    },
    imageMessenger: {
        width: 50,
        height: 50,
    },
    chatPeopleTextConteiner: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: width - 180
    },
    chatPeopleAutorText: {
        color: '#000000',
        fontSize: 17
    },
    chatPeopleMessegText: {
        color: '#644800',
        fontSize: 17,
    },
})


export default connect()(withNavigation(ChatPeople));