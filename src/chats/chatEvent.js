import React from 'react';
import {View,Image,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import InfoEvent from '../details/infoEvent';

const { width, height } = Dimensions.get('window');

function ChatEvent (props) {
    return(
        <View style={styles.chatEventConteiner}>
            <View style={styles.chatEventTopConteiner}>
                <Text numberOfLines={2} style={styles.topText}>Турнир с футбoла для школьников </Text>
                <View style={styles.autorConteiner}>
                    <View style={styles.imageAutorConteiner}>
                        <Image style={styles.autorImage} source={require('../img/testImage.png')}/>
                    </View>
                    <Text style={styles.autorText} numberOfLines={2}>nik_name esdc</Text>
                </View>
            </View>

            <View style={styles.chatEventBottomConteiner}>
                <View style={styles.infoEventConteiner}>
                    <InfoEvent/>
                </View>

                <TouchableOpacity style={styles.btnConteiner} onPress={()=>props.navigation.push('Messenger')}>
                    <Image style={styles.btnImage} source={require('../img/icons/btns/messenger.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    chatEventConteiner: {
        width: width,
        height: 150,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
        paddingHorizontal: 15,
        paddingTop: 7
    },
    chatEventTopConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    topText: {
        color: '#644800',
        fontSize: 16,
        width: 200
    },
    autorConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    autorText: {
        color: "#000000",
        fontSize: 15,
        width: 80,
        marginLeft: 7
    },
    autorImage: {
        width: 50,
        height :50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        marginHorizontal: 5
    },
    chatEventBottomConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 20,
        alignItems: 'center',
        marginTop: 15
    },
    btnImage: {
        width: 50,
        height: 50
    },
    btnConteiner: {
        width: 70,
        height: 70
    },
    infoEventConteiner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: 210,
        justifyContent: 'space-around'
    },
    imageAutorConteiner: {
        backgroundColor: 'green',
        width:55,
        height: 55,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
    }
})


export default connect()(withNavigation(ChatEvent));