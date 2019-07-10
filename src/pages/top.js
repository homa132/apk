import React,{Component} from 'react';
import {View,FlatList,StyleSheet,ImageBackground,Dimensions,ScrollView,Image,
    TextInput} from 'react-native';
import {connect} from 'react-redux';
import Item from '../top/item';


const { width, height } = Dimensions.get('window');

class MainSecond extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.searchConteiner}>
                            <Image source={require('../img/icons/btns/search.png')} style={styles.searchImage}/>
                            <TextInput placeholder='поиск пользователей' placeholderTextColor='#FFF960' style={styles.searchInput} />
                        </View>
                        <FlatList
                        data={[{key:'1'},{key: '2'},{key:'3'},{key:'4'},{key:'5'},{key:'6'}]}
                        renderItem={(item)=><Item item={item}/>}/>
                    </ScrollView>
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

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(MainSecond);