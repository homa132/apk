import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,ImageBackground,Image,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Conteiner from '../details/conteinerDetailsScreen';
import SocialLink from '../details/socialLink';
import InfoEvent from '../details/infoEvent';
import {setActiveItem} from '../redux/actions';
import firebase from 'react-native-firebase';

const { width, height } = Dimensions.get('window');



class Details extends Component{

    constructor(props){
        super(props);
        this.state = {
            scrollEnd: 0,
            loader: true,
            item: {}
        }


    }

    componentDidMount = async () => {
        const firstItem = await firebase.firestore().collection('ListEvents').doc(this.props.heshItem).get();
        const itemSecond = await firebase.firestore().collection('MoreEvents').doc(this.props.heshItem).get();
        const first = firstItem.data();
        const second = itemSecond.data();

        await this.setState({
            item: {...first,...second},
            loader: false
        })

        await firebase.firestore().collection('MoreEvents').doc(this.props.heshItem).onSnapshot((detail) => {
            let data = detail.data()
            this.setState({item:{...this.state.item, ...data}});
        })
    }


    navigateToDetailsUser = (hesh) => {
        this.props.setActiveItem('hestUser',hesh)
        this.props.navigation.push('DetailsUser')
    }

    render(){
        const {scrollEnd,loader,item} = this.state;
        const {name,date,time,category,contacts,images,heshMessenger,textMore,location,likesHesh,autor,heshEvent}  = item;
        
        return (
            <React.Fragment>
                {loader?<View style={styles.loaderConteiner}><ActivityIndicator size="large" color="#644800" /></View>:
                <Conteiner scrollEnd={scrollEnd} images={images} location={location} autor={autor} likesHesh={likesHesh} heshEvent={heshEvent}>
                    <ImageBackground source={require('../img/background/background1.jpg')} style={styles.backgroundConteiner}>
                        <View style={styles.line}></View>
                        <ScrollView onMomentumScrollEnd={(e)=>this.setState({scrollEnd:e.nativeEvent.contentOffset.y})}>
                            <View style={styles.conteiner}>
                                
                                <Text style={styles.mainText}>{name}</Text>

                                <View style={styles.infoConteiner}>

                                    <InfoEvent date={date} time={time} category={category}/>

                                    <View style={styles.secondConteiner}>

                                        <TouchableOpacity style={styles.infoItemSecondConteiner} onPress={()=>this.navigateToDetailsUser(autor.autorHesh)}>
                                            <View style={[styles.autorImageBackground,{backgroundColor:autor.autorColor}]}>
                                                <Image source={{uri:autor.autorImage}}
                                                        style={{width:50,height:50,borderRadius:25,borderColor: 'white',borderWidth:1}}/>
                                            </View>
                                            <Text style={styles.nickText}>{autor.autorNick}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                                <Text style={styles.moreText}>{textMore}</Text>

                                <View style={styles.bottomConteiner}>
                                    <SocialLink contacts={contacts}/>

                                    <TouchableOpacity style={styles.friendsConteiner}>
                                        <Text style={styles.friendsText}>Пригласить</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                            <Text></Text>
                        </ScrollView>

                    </ImageBackground>
                </Conteiner>
                }
            </React.Fragment>
            
            
        )
    }
};

const styles = StyleSheet.create({
    loaderConteiner: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: "center"
    },
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
        setActiveItem: (name,hesh)=>dispatch(setActiveItem(name,hesh))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);