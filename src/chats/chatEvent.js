import React from 'react';
import {View,Image,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import InfoEvent from '../details/infoEvent';
import {setActiveItem} from '../redux/actions';


const { width, height } = Dimensions.get('window');

function ChatEvent (props) {
    const {item} = props;
    const {name,category,autor,date,time,heshMessenger} = item;
    console.log(item);
    
    return(
        <View style={styles.chatEventConteiner}>
            <View style={styles.chatEventTopConteiner}>
                <Text numberOfLines={2} style={styles.topText}>{name}</Text>
                <View style={styles.autorConteiner}>
                    <View style={[styles.imageAutorConteiner,{backgroundColor: autor.autorColor}]}>
                        <Image style={styles.autorImage} source={{uri: autor.autorImage}}/>
                    </View>
                    <Text style={styles.autorText} numberOfLines={2}>{autor.autorNick}</Text>
                </View>
            </View>

            <View style={styles.chatEventBottomConteiner}>
                <View style={styles.infoEventConteiner}>
                    <InfoEvent time={time} date={date} category={category}/>
                </View>

                <TouchableOpacity style={styles.btnConteiner} onPress={()=>{
                    props.setActiveItem('heshChat',heshMessenger);
                    props.setActiveItem('dataChat',item);
                    props.navigation.push('Messenger');
                    }}>
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
        width:55,
        height: 55,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
    }
})

mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (name,value) => dispatch(setActiveItem(name,value))
    }
}


export default connect(null,mapDispatchToProps)(withNavigation(ChatEvent));