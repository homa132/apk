import React from 'react';
import {View,StyleSheet,Image,Text,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {setActiveItem} from '../redux/actions';

const { width, height } = Dimensions.get('window');

function ChatPeople(props){
    const user = props.item.users.filter(item=> item.autorHesh != props.myHesh);
    const {autorHesh,autorImage,autorNick,autorColor} = user[0];
    
    return(
        <View style={styles.chatPeopleConteiner}>
            <View style={styles.imageAutorConteinerSecond}>
                <Image style={styles.imagePeople} source={{uri: autorImage}}/>
            </View>
            <View style={styles.chatPeopleTextConteiner}>
                <Text style={styles.chatPeopleAutorText} numberOfLines={1}>{autorNick}</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                props.setActiveItem('heshChat',props.item.heshMessenger);
                props.setActiveItem('dataChat',props.item);
                props.navigation.navigate('Messenger')}}>
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

const mapStateToProps = (state) => {
    return {
        myHesh: state.data.myDataAcc.heshUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (name,value) => dispatch(setActiveItem(name,value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(ChatPeople));