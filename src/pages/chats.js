import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,Image,ImageBackground,Dimensions,TextInput} from 'react-native';
import {connect} from 'react-redux';
import ChatEvent from '../chats/chatEvent';
import ChatPeople from '../chats/chatPeople';


const { width, height } = Dimensions.get('window');


class Likes extends Component{


    render(){
        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.searchConteiner}>
                        <Image source={require('../img/icons/btns/search.png')} style={styles.searchImage}/>
                        <TextInput placeholder='поиск чата' placeholderTextColor='#FFF960' style={styles.searchInput} />
                    </View>
            
                    <FlatList
                    data={[{key:'1'},{key:'2'},{key:'3'},{key:'4'},{key:'5'},{key:'6'},{key:'7'}]}
                    renderItem={({item,index})=>{
                    if(+item.key%2){
                        return <ChatPeople/>
                    }else{
                         return <ChatEvent/>
                    }}}/>
                    

                </View>
            </ImageBackground>

        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        margin: 0
    },
    background: {
        width: '100%',
        height: '100%'
    },
    searchConteiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 50,
        width: width,
        borderBottomColor: '#644800',
        borderBottomWidth: 2,
        marginTop: 5
    },
    searchImage: {
        width: 45,
        height: 45,
    },
    searchInput: {
        width: width -90,
        height: 40,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 1.8,
        color: '#644800',
        fontSize: 16,
    },
})


export default connect()(Likes);