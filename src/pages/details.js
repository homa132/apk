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
        const {navigation,data} = this.props.state;
        return data.testList.find((item,index) => {
            return navigation.heshItem == item.hesh
        })
    }

    render(){
        let item = this.changeItem();
        const {name,date,time,category,contacts,images,heshMessenger,textMore}  = item;
        const {showSocial,scrollEnd} = this.state;

        return (
            <Conteiner scrollEnd={scrollEnd}>
                <ImageBackground source={require('../img/background/background1.jpg')} style={styles.backgroundConteiner}>
                    <View style={styles.line}></View>
                    <ScrollView onMomentumScrollEnd={(e)=>this.setState({scrollEnd:e.nativeEvent.contentOffset.y})}>
                        <View style={styles.conteiner}>
                            
                            <Text style={styles.mainText}>{name}</Text>

                            <View style={styles.infoConteiner}>
                                <InfoEvent/>
                                <View style={styles.secondConteiner}>
                                    <View style={styles.infoItemSecondConteiner}>
                                        <Image source={{uri:'https://image.shutterstock.com/image-vector/light-bulb-line-icon-vector-260nw-416374336.jpg'}}
                                                style={{width:50,height:50,borderRadius:25}}/>
                                        <Text style={styles.nickText}>Nick Name Autor</Text>
                                    </View>
                                    <View style={styles.infoItemSecondConteiner}>
                                        <Image style={{width:40,height: 40}} source={require('../img/icons/detailsScreen/people.png')}/>
                                        <Text style={styles.peopleText}>500</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={styles.moreText}>Material is an adaptable system of guidelines, components, and tools that support the best practices of user interface design. Backed by open-source code, Material streamlines collaboration between designers and developers, and helps teams quickly build beautiful products.</Text>
                            
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
    },
    nickText: {
        fontSize: 15,
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
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);