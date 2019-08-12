import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,Image,ImageBackground,Dimensions,TextInput,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import ChatEvent from '../chats/chatEvent';
import ChatPeople from '../chats/chatPeople';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');


class Chats extends Component{

    constructor(props){
        super(props);

        this.state = {
            loader: true,
            chats: [],
            lastChat: '',
            refresh: false,
            allList: false
        }
    }

    getData = () => {
        const {myUserHesh} = this.props;
        const chats = firebase.firestore().collection('chats').where('arrayUsers',"array-contains",myUserHesh).orderBy('lastMess','desc').limit(5);

        chats.get().then((item) => {
            let chats = [];

            item.forEach((i) => {
                chats.push(i.data());
            })

            let lastChat = item.docs[item.docs.length-1];

            this.setState({loader: false,lastChat,chats,refresh: false})
        })
    }

    componentDidMount(){
        this.getData();
    }

    refresh = () => {
        this.setState({refresh: true})
        this.getData()
    }

    addData = () => {
        const {myUserHesh} = this.props;
        const {chats,lastChat,allList} = this.state;
        if(allList){

        }else{
            const newChats = firebase.firestore().collection('chats').where('arrayUsers',"array-contains",myUserHesh).orderBy('lastMess','desc')
            .startAfter(lastChat).limit(5);
            
            newChats.get().then((item) => {
                let data = [];
    
                item.forEach((i) => {
                  data.push(i.data());
                })
                let newLastChat = item.docs[item.docs.length-1];
                if(chats.length == [...chats,...data].length){
                    this.setState({allList: true});
                }
                this.setState({lastChat:newLastChat,chats:[...chats,...data]});
            })
        }

    }

    render(){
        const {loader,chats,refresh,lastChat} = this.state;
        
        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                {loader?
                <View style={{width: width,height: height,justifyContent: 'center',
                        alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.searchConteiner}>
                        <Image source={require('../img/icons/btns/search.png')} style={styles.searchImage}/>
                        <TextInput placeholder='поиск чата' placeholderTextColor='#FFF960' style={styles.searchInput} />
                    </View>
            
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={chats}
                        refreshing={refresh}
                        onRefresh={this.refresh}
                        onEndReachedThreshold={0.001}
                        onEndReached={(info) => this.addData()}
                        renderItem={({item,index})=>{
                            
                            if(!item.event){
                                return <ChatPeople item={item}/>
                            }else{
                                return <ChatEvent item={item}/>
                            }}}/>
                </View>
                }
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

const mapStateToProps = (state) => {
    return {
        myUserHesh: state.data.myDataAcc.heshUser
    }
}

export default connect(mapStateToProps)(Chats);