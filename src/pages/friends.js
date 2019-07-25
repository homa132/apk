import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,Image,FlatList,Dimensions,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {setActiveItem} from '../redux/actions';

const { width, height } = Dimensions.get('window');

class Friends extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: ['first',...props.arrayFrineds]
        }
    }

    // покаместь не нужно, если будет лагать при бальшом количеству  пользователей то добавить
    // addData = () => {
    //     console.log('new data');
        
    //     this.setState({data: [...this.state.data,'a','a','6','5']})
    // }

    render(){

        const {data} = this.state;
        
        return (
            <ImageBackground style={{width:width, height: height - 74}} source={require('../img/background/background1.jpg')}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    // onEndReachedThreshold={0.001}
                    // onEndReached={(info) => this.addData()}
                    renderItem={({item,index}) => {
                        if(index == 0 ){
                            return (
                                <View style={styles.searchConteiner}>
                                    <TouchableOpacity style={styles.btnBackConteiner} onPress={() => this.props.navigation.goBack()}>
                                        <Image source={require('../img/icons/btns/btnBack.png')} style={styles.searchImage}/>
                                    </TouchableOpacity>
                                    <TextInput placeholder='поиск ' placeholderTextColor='#FFF960' style={styles.searchInput} />
                                    <Image source={require('../img/icons/btns/search.png')} style={styles.searchImage}/>
                                </View>
                            )
                        }else{
                            return (
                                <View style={styles.conteinerItem}>
                                    <Image source={{uri: item.img}} style={styles.imgUser}/>
                                    <Text style={styles.itemText}>{item.nick}</Text>
                                    <TouchableOpacity style={styles.btnMoreConteiner} onPress={() => {
                                        this.props.setActiveItem('hestUser',item.hesh);
                                        this.props.navigation.push('DetailsUser')
                                    }}>
                                        <Image source={require('../img/icons/btns/btnMore.png')} style={styles.btnMore}/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    }}
                />
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({
    conteinerItem: {
        justifyContent: 'space-between',
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        height: 65,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 2,
        paddingHorizontal: 15
    },
    imgUser: {
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7
    },
    itemText: {
        fontSize: 20,
        color: '#644800',
    },
    btnMore: {
        width: 50,
        height: 50
    },
    btnMoreConteiner: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: width,
        borderBottomColor: '#644800',
        borderBottomWidth: 2,
        marginTop: 5,
        paddingHorizontal: 5
    },
    searchImage: {
        width: 50,
        height: 50,
    },
    searchInput: {
        width: width -130,
        height: 50,
        borderBottomColor: '#E8BC4D',
        borderBottomWidth: 1.8,
        color: '#644800',
        fontSize: 18,
    },
    btnBackConteiner: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

mapStateToProps = (state) => {
    return {
        arrayFrineds: state.navigation.arrayFriends
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        setActiveItem: (name,value) => dispatch(setActiveItem(name,value))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(Friends));