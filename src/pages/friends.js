import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,Image,FlatList,Dimensions,TextInput} from 'react-native';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');

class Friends extends Component {

    state = {
        data: ['a','a','a','a','a','a','a','a','6','5','4']
    }

    addData = () => {
        console.log('new data');
        
        this.setState({data: [...this.state.data,'a','a','6','5']})
    }

    render(){

        const {data} = this.state;

        return (
            <ImageBackground style={{width:width, height: height - 74}} source={require('../img/background/background1.jpg')}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    onEndReachedThreshold={0.001}
                    onEndReached={(info) => this.addData()}
                    bounces={false}
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
                                    <View style={[styles.imgUserConteiner,{backgroundColor: 'red'}]}>
                                        <Image source={require('../img/testImage.png')} style={styles.imgUser}/>
                                    </View>
                                    <Text style={styles.itemText}>Nick name use{item}r</Text>
                                    <TouchableOpacity style={styles.btnMoreConteiner}>
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
        borderBottomWidth: 2
    },
    imgUser: {
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7
    },
    imgUserConteiner: {
        borderRadius: 7,
        width: 54,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
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

export default connect()(Friends);