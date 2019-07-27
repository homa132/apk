import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity,Image,ImageBackground,KeyboardAvoidingView,FlatList,
    ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';
import ItemMesseg from '../messenger/itemMessege';

const { width, height } = Dimensions.get('window');

class Messenger extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loader: true,
            aboutChat: false,
            lastMessege: '',
            newMesseg: '',
        }
    }

    componentDidMount(){
        const {heshChat,dataChat} = this.props;
        if(dataChat){
            const messenge = firebase.firestore().collection('chats').doc(heshChat).collection('messege').orderBy('dateCreate','desc').limit(15);
            this.searchData = messenge.onSnapshot((item) => {
                let data = [];

                item.forEach((i) => {
                    data.push(i.data());
                })

                let lastMessege = item.docs[item.docs.length-1];

                this.setState({aboutChat: dataChat,loader: false,lastMessege,data})
            })
        }
    }


    addData = () => {
        console.log('add ');
        const {heshChat} = this.props;
        
        const {lastMessege,data} = this.state;
        const messenge = firebase.firestore().collection('chats').doc(heshChat).collection('messege').orderBy('dateCreate','desc').startAfter(lastMessege).limit(15);
        messenge.get().then((item) => {
            console.log(item);
            let newData = [];

            item.forEach((i) => {
                newData.push(i.data());
            })
  
            let lastDoc = item.docs[item.docs.length-1];
            console.log(newData);
            this.setState({lastMessege: lastDoc,
            data: [...data,...newData]})
        })

    }

    componentWillUnmount(){
        this.searchData();
    }

    newMess = () => {
        const date = new Date;
        const {myHesh,myImage,heshChat} = this.props;
        
        firebase.firestore().collection('chats').doc(heshChat).collection('messege').add({
            dateCreate: date.getTime(),
            date: '20.02.2019 10-50:50',
            autor: {
                autorHesh: myHesh,
                autorImage: myImage
            },
            messege: this.state.newMesseg
        })
        this.setState({newMesseg: ''})
        
    }

    render(){

        const {data,loader,aboutChat,newMesseg} = this.state;
        
        return (
            <ImageBackground style={{width: width,height: height}} source={require('../img/background/background1.jpg')}>
                {loader?
                    <View style={{width: width,height: height,justifyContent: 'center',alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#644800" />
                    </View>
                    :
                    <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled >
                        <View style={styles.headerConteiner}>
                            <TouchableOpacity style={styles.headerBtnConteiner} onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../img/icons/btns/btnBack.png')} style={styles.headerBtn}/>
                            </TouchableOpacity>

                            <Text style={styles.headerText} numberOfLines={1}>{aboutChat.name}</Text>

                            <TouchableOpacity style={styles.headerBtnConteiner}>
                                <Image source={require('../img/icons/btns/settingBtn.png')} style={styles.headerBtn}/>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={data}
                            renderItem={({item,index})=><ItemMesseg item={item} data={data} index={index}/>}
                            style={{width: width,height: height - 190}}
                            inverted={-1}
                            onEndReachedThreshold={0.001}
                            onEndReached={(info) => this.addData()}
                        />



                        <View style={styles.bottomConteiner}>
                            <TextInput placeholder='Сообщение' style={styles.input} placeholderTextColor='#E8BC4D' value={newMesseg} 
                                onChangeText={(newMesseg) => this.setState({newMesseg})}/>
                            <TouchableOpacity style={styles.btnMessConteiner} onPress={this.newMess}>
                                <Image source={require('../img/icons/btns/btnMesseng.png')} style={styles.btnMess}/>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                    }
                
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

mapStateToProps = (state) => {
    return {
        heshChat: state.navigation.heshChat,
        dataChat: state.navigation.dataChat,
        myHesh: state.data.myDataAcc.heshUser,
        myImage: state.data.myDataAcc.urlImg
    }
}

export default connect(mapStateToProps)(Messenger);