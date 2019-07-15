import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,ImageBackground,Image,TextInput} from 'react-native';
import {connect} from 'react-redux';
import Conteiner from '../details/conteinerDetailsScreen';
import SocialLink from '../details/socialLink';
import InfoEvent from '../details/infoEvent';
const { width, height } = Dimensions.get('window');



class Details extends Component{

    constructor(props){
        super(props);
        this.state = {
            scrollEnd: 0
        }
    }


    changeItem = () => {
        return this.props.list.find((item,index) => {
            return this.props.heshItem == item.hesh
        })
    }

    render(){
        let item = this.changeItem();
        const {name,date,time,category,contacts,images,heshMessenger,textMore,location,likesHesh,autor,hesh}  = item;
        const {scrollEnd} = this.state;

        return (
            <Conteiner scrollEnd={scrollEnd} images={images} location={location} autor={autor} likesHesh={likesHesh} hesh={hesh}>
                <ImageBackground source={require('../img/background/background1.jpg')} style={styles.backgroundConteiner}>
                    <View style={styles.line}></View>
                    <ScrollView onMomentumScrollEnd={(e)=>this.setState({scrollEnd:e.nativeEvent.contentOffset.y})}>
                        <View style={styles.conteiner}>
                            
                            <Text style={styles.mainText}>{name}</Text>

                            <View style={styles.infoConteiner}>

                                <InfoEvent date={date} time={time} category={category}/>

                                <View style={styles.secondConteiner}>

                                    <TouchableOpacity style={styles.infoItemSecondConteiner}>
                                        <View style={[styles.autorImageBackground,{backgroundColor:autor.colorAutor}]}>
                                            <Image source={{uri:autor.photoAutor}}
                                                    style={{width:50,height:50,borderRadius:25,borderColor: 'white',borderWidth:1}}/>
                                        </View>
                                        <Text style={styles.nickText}>{autor.nickAutor}</Text>
                                    </TouchableOpacity>

                                    {/* <View style={styles.infoItemSecondConteiner}>
                                        <Image style={{width:40,height: 40}} source={require('../img/icons/detailsScreen/people.png')}/>
                                        <Text style={styles.peopleText}>500</Text>
                                    </View> */}
                                </View>
                            </View>

                            <Text style={styles.moreText}>{textMore}</Text>

                            <View style={styles.bottomConteiner}>
                                <SocialLink/>

                                <TouchableOpacity style={styles.friendsConteiner}>
                                    <Text style={styles.friendsText}>Пригласить</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <Text></Text>
                    </ScrollView>

                </ImageBackground>
            </Conteiner>
        )
    }
};

const styles = StyleSheet.create({
    autorImageBackground: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:27.5
    },
    backgroundConteiner: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
    },
    conteiner: {
        flex: 1,
        alignItems: 'center',
    },
    line: {
        width: 60,
        borderColor: '#644800',
        borderWidth: 2,
        borderRadius: 2,
        marginTop: 12,
        marginLeft:width/2-30,
        marginBottom:10
    },
    mainText: {
        fontSize: 20,
        color: '#644800',
        width: width - 40,
        textAlign:'center',
        marginTop: 10
    },
    infoConteiner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        width: width,
        alignItems:'flex-start',
        marginTop: 20
    },
    infoItemConeiner :{
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 90
    },
    infoItemText: {
        fontSize: 18,
        color: '#644800',
        letterSpacing: 0.1
    },
    infoItemSecondConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width-20,
        justifyContent: 'flex-start'
    },
    nickText: {
        fontSize: 17,
        color: '#000000',
        marginLeft: 10
    },
    peopleText: {
        fontSize:23,
        color: '#644800'
    },
    secondConteiner :{
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 20,
        justifyContent: 'space-around',
        marginTop: 10
    },
    moreText: {
        width: width -30,
        fontSize: 16,
        color: '#644800',
        marginTop: 22
    },
    bottomConteiner: {
        width: width -40,
        flexDirection: 'row',
        alignItems: 'center',
        height: 140
    },
    friendsConteiner: {
        width:110,
        height: 40,
        borderColor: '#644800',
        borderWidth: 2,
        backgroundColor:'rgba(217, 217, 217, 0.7)',
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:40
    },
    friendsText: {
        fontSize: 16,
        color: '#644800'
    }
})

const mapStateToProps = (state) => {
    return {
        list: state.data.testList,
        heshItem: state.navigation.heshItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);