import React,{Component} from 'react';
import {View,TouchableOpacity,Text,StyleSheet,Dimensions,Image} from 'react-native';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {setNewMyData} from '../redux/actions';

const { width, height } = Dimensions.get('window');

class userInfo extends Component {


    changeImage = () => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            quality: 0.4,
            noData: true
        },({path,fileName})=> {
              this.props.setNewMyData('urlImg',`file://${path}`)
        })
    }

    render(){
        const {my,color,urlImg,myEvents,friends,myFriends,position,bal} = this.props;

        return(
            <View style={styles.itemTopConteiner}>
                <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}} disabled={!my} onPress={this.changeImage}>
                    <View style={[styles.itemImageConteiner,{backgroundColor:color}]} >
                        <Image style={styles.itemImage} source={{uri:urlImg}}/>
                    </View>
                    <View style={styles.myConteiner}>
                        <Text style={styles.myText}>изменить</Text>
                    </View>
                </TouchableOpacity>
    
                <View style={styles.itemTopInfoConteiner}>
    
                    <View style={styles.itemTopPersonalInfoConteiner}>
    
                        <TouchableOpacity style={styles.topInfoItem}>
                            <Text style={styles.infoTextNumber}>{myFriends.length}</Text>
                            <Text style={styles.infoText}>Подписки</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.topInfoItem}>
                            <Text style={styles.infoTextNumber}>{friends.length}</Text>
                            <Text style={styles.infoText}>Подписчики</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.topInfoItem}>
                            <Text style={styles.infoTextNumber}>{myEvents.length}</Text>
                            <Text style={styles.infoText}>События</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={[styles.infoBalConteiner,{marginTop: 10}]}>
                        <Text style={styles.infoBalText}>Балов: {bal}</Text>
                        <Image style={styles.infoBAlImage} source={require('../img/icons/detailsPersonalAcc/Star.png')}/>
                    </View>
                    <View style={styles.infoBalConteiner}>
                        <Text style={styles.infoBalText}>Позиция: {position}</Text>
                        <Image style={{width:25,height: 25}} source={require('../img/icons/detailsPersonalAcc/people.png')}/>
                    </View>
    
                </View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    myConteiner: {
        position: 'relative',
        top: -15,
        width: 70,
        height: 16,
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    myText: {
        fontSize: 10,
        color: '#644800'
    },
    itemTopConteiner: {
        flexDirection: 'row',
        width: width - 20,
        alignItems: 'center',
        height: 120,
        marginBottom: 5
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1.4
    },
    itemImageConteiner: {
        width: 108,
        height: 108,
        borderRadius: 54,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTopInfoConteiner: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    itemTopPersonalInfoConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 240,
        height: 40
    },
    topInfoItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center'
    },
    infoTextNumber: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#644800'
    },
    infoText: {
        color: '#644800',
        fontSize: 12
    },
    infoBalConteiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 2.5
    },
    infoBalText: {
        fontSize: 17,
        color: '#644800',
        fontWeight: 'bold'
    },
    infoBAlImage: {
        width: 20,
        height: 20
    },
})

mapDispatchToProps = (dispatch) => {
    return {
        setNewMyData: (name,value,secondName)=>dispatch(setNewMyData(name,value,secondName))
    }
}

export default connect(null,mapDispatchToProps)(userInfo)