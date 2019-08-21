import React,{Component} from 'react';
import {View,FlatList,StyleSheet,ImageBackground,Dimensions,Image,
    TextInput,ActivityIndicator,TouchableOpacity,Text} from 'react-native';
import {connect} from 'react-redux';
import Item from '../top/item';
import firebase from 'react-native-firebase';
import {setActiveItem} from '../redux/actions';

const { width, height } = Dimensions.get('window');

class MainSecond extends Component{

    constructor(props){
        super(props);
        this.state = {
            loader: true,
            lastUser: false,
            users: false,
            allList: false,
            searchUser: '',
            noSearch: false,
            refresh: false
        }
    }

    getData = () => {
        firebase.firestore().collection('users').orderBy('bal','desc').limit(7).get().then(item => {
            let users = [];
            item.forEach((i) => {
                users.push(i.data());
            })
            let lastUser = item.docs[item.docs.length-1];
            this.setState({lastUser,loader: false,users,noSearch: false,refresh: false});
        })
    }

    componentDidMount(){
        this.getData();
    }

    addData = () => {
        const {lastUser,users} = this.state;
        
        const path = firebase.firestore().collection('users').limit(7);
        
        path.get().then((item) => {
            let data = [];
            item.forEach((i) => {
                data.push(i.data());
            })

            let newLastUser = item.docs[item.docs.length-1];
            
            if(users.length == [...users,...data].length){
                this.setState({allList: true});
            }
            this.setState({lastUser: newLastUser,users: [...users,...data]})
        });
    }

    goToUser = (hesh) => {
        this.props.setActiveItem('hestUser',hesh);
        this.props.navigation.push('DetailsUser');
    }

    refresh = () => {
        this.setState({refresh: true})
        this.getData();
    }

    searchUser = () => {
        const {searchUser} = this.state;

        if(searchUser.length == 0){
            this.getData();
        }else{
            firebase.firestore().collection('users').where('nick','=',searchUser).get().then(item => {
                let data = [];
    
                item.forEach(i=>{
                    data.push(i.data())
                })
    
                if(data.length != 0){
                    this.setState({users: data,noSearch: false})
                }else{
                    this.setState({noSearch: true})
                }
            })
        }


    }
 
    render(){
        const {loader,users,allList,searchUser,noSearch,refresh} = this.state;

        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                {loader?
                <View style={{width: width,height: height - 70,justifyContent: 'center',alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#FFF960"/>
                </View>
                :
                <View style={styles.container}>
                        <View style={styles.searchConteiner}>
                            <TextInput placeholder='поиск пользователей' placeholderTextColor='#FFF960' style={styles.searchInput} 
                                value={searchUser} onChangeText={(value) => this.setState({searchUser: value})}/>
                            <TouchableOpacity onPress={this.searchUser}>
                                <Image source={require('../img/icons/btns/btnSearch.png')} style={styles.searchImage}/>
                            </TouchableOpacity>
                        </View>


                        <FlatList
                        refreshing={refresh}
                        onRefresh={this.refresh}
                        keyExtractor={(item, index) => index.toString()}
                        data={noSearch?'one':users}
                        onEndReachedThreshold={0.001}
                        onEndReached={(info) => {allList?null:this.addData();}}
                        renderItem={(item)=>{
                        if(noSearch){
                            return (
                                <View style={styles.noSearchConteiner}>
                                    <Text style={styles.noSearchText} >Пользователя с таким ником нету</Text>
                                </View>
                            )
                        }else{
                            return(
                                <Item item={item} goToUser={(hesh)=>this.goToUser(hesh)}/>
                            )
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        width: width,
        borderBottomColor: '#644800',
        borderBottomWidth: 2,
        paddingHorizontal: 5
    },
    searchImage: {
        width: 55,
        height: 55,
        position: 'relative',
        top: 5
    },
    searchInput: {
        width: width -90,
        height: 50,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 1.8,
        color: '#644800',
        fontSize: 18,
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    noSearchConteiner: {
        width: width,
        height: height - 135,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noSearchText: {
        fontSize: 24,
        color: '#CB0000',
        textAlign: 'center',
        paddingHorizontal: 25,
        width: width
    }
})

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (name,value) => dispatch(setActiveItem(name,value)),
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(MainSecond);