import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,ImageBackground,Image,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo,setNavigation} from '../redux/actions';
import Conteiner from '../conteiners/conteinerDetailsScreen';

const { width, height } = Dimensions.get('window');



class Details extends Component{

    constructor(props){
        super(props);
        props.setNavigation(props.navigation);
        this.state = {
            showSocial: false,
            scrollEnd: 0
        }
    }


    changeItem = () => {
        const {navigation,data} = this.props.state;
        return data.testList.filter((item,index) => {
            return navigation.heshItem == item.hesh
        })
    }

    render(){
        let item = this.changeItem();
        const {name,date,time,category,contacts,images,heshMessenger,textMore}  = item[0];
        const {showSocial,scrollEnd} = this.state;

        return (
            <Conteiner scrollEnd={scrollEnd}>
                <ImageBackground source={require('../img/background/background1.jpg')} style={styles.backgroundConteiner}>
                    <View style={styles.line}></View>
                    <ScrollView onMomentumScrollEnd={(e)=>this.setState({scrollEnd:e.nativeEvent.contentOffset.y})}>
                        <View style={styles.conteiner}>
                            
                            <Text style={styles.mainText}>Футбольное соревнование между студантами </Text>

                            <View style={styles.infoConteiner}>
                                <View style={styles.infoItemConeiner}>
                                    <Image source={require('../img/icons/detailsScreen/time.png')} style={{width:32,height:32}}/>
                                    <Text style={styles.infoItemText}>20:40</Text>
                                </View>
                                <View style={styles.infoItemConeiner}>
                                    <Image source={require('../img/icons/detailsScreen/date.png')} style={{width:32,height:32}}/>
                                    <Text style={styles.infoItemText}>20.05</Text>
                                    <Text style={{color: '#644800',fontSize:13,position: 'relative',top:-10}}>2019</Text>
                                </View>
                                <View style={styles.infoItemConeiner}>
                                    <Image source={require('../img/icons/detailsScreen/category.png')} style={{width:32,height:32}}/>
                                    <Text style={styles.infoItemText}>Спорт</Text>
                                </View>
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
                                <View style={styles.socialConteiner}>
                                    {showSocial?
                                    <React.Fragment>
                                        <TouchableOpacity style={styles.allSocial}>
                                            <Image source={require('../img/icons/detailsScreen/inst.png')} style={{width: 30,height:30}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.social}>
                                            <Image source={require('../img/icons/detailsScreen/telegrame.png')} style={{width: 30,height:30}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.social} onPress={()=>this.setState({showSocial:false})}>
                                            <Image source={require('../img/icons/detailsScreen/closeMore.png')} style={{width: 50,height:50}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.social}>
                                            <Image source={require('../img/icons/detailsScreen/web.png')} style={{width: 30,height:30}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.allSocial}>
                                            <Image source={require('../img/icons/detailsScreen/facebook.png')} style={{width: 30,height:30}}/>
                                        </TouchableOpacity>
                                    </React.Fragment>
                                    :
                                    <TouchableOpacity style={[styles.social,{marginLeft:50}]} onPress={()=>this.setState({showSocial:true})}>
                                        <Image source={require('../img/icons/detailsScreen/IconMore.png')} style={{width: 50,height:50}}/>
                                    </TouchableOpacity>
                                    }
                                    
                                </View>

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
    socialConteiner: {
        width:150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    allSocial: {
        width:140,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    social: {
        margin: 5,
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
        navigateTo: (screen) => dispatch(navigateTo(screen)),
        setNavigation: (nav) => dispatch(setNavigation(nav))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Details);