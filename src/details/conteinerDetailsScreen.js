import React,{Component} from 'react';
import {View,Animated,Easing,Dimensions,StyleSheet,Image,TouchableOpacity,Text} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Map from '../map/map';

const { width, height } = Dimensions.get('window');

class Conteiner extends Component {

    constructor(props){
        super(props);
        this.animatedTop = new Animated.Value (0);
        this.state = {
            scroled: false,
            pageY:0,
            likes: false,
            showMap:false
        }
    }

    toTop = () => {
        this.animatedTop.setValue(0);
        Animated.timing(
          this.animatedTop,
          {
            toValue: 1,
            duration: 700,
            easing: Easing.linear
          }
        ).start(this.setState({scroled:true}))
    }

    toBottom = () => {
        this.animatedTop.setValue(1);
        Animated.timing(
          this.animatedTop,
          {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear
          }
        ).start(this.setState({scroled:false}))
    }


    render(){
        const {pageY,scroled,likes,showMap} = this.state;
        const toTop = this.animatedTop.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 90]
          })
        const {scrollEnd} = this.props;
        
        return (
            <View style={styles.conteiner} onStartShouldSetResponder={(e)=>{
                if(e.nativeEvent.pageY>width-40&&!scroled){
                    this.setState({pageY:e.nativeEvent.pageY})
                    return true
                }
                if(scroled&&e.nativeEvent.pageY>50&&scrollEnd <5){
                    this.setState({pageY:e.nativeEvent.pageY})
                    return true
                }
                if(scroled&&e.nativeEvent.pageY>60&&e.nativeEvent.pageY<90){
                    this.setState({pageY:e.nativeEvent.pageY})
                    return true
                }
            }} onResponderMove={(e)=>{
                if(!scroled&&e.nativeEvent.pageY+10<pageY){
                    this.toTop()
                    this.setState({scroled:true})
                }
                if(scroled&&e.nativeEvent.pageY>pageY+10){
                    this.toBottom();
                    this.setState({scroled:false});
                }
            }}>
                        <View style={styles.conteinerImageSlider}>
                            {showMap?<Map/>:
                            <ImageSlider
                            loop
                            images={['https://firebasestorage.googleapis.com/v0/b/project-99846.appspot.com/o/testImage.png?alt=media&token=e4ac9402-dc9d-4621-b886-9c0ace7d903b',
                            'https://firebasestorage.googleapis.com/v0/b/project-99846.appspot.com/o/usersImage%2FqTTXpkM9sWOYpc8GXRJ4sG6Y7wq2%2FuserImg?alt=media&token=7b69b590-d9c2-4b21-b6bc-6b8e2a216c1d']}
                            customSlide={({ index, item, style }) => (
                                <Image source={{ uri: item }} style={{width:width,height:width}} key={index}/>
                            )}
                            />
                            }
                            
                            <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={styles.backBtn}>
                                <Image source={require('../img/icons/btns/btnBack.png')} style={{width:50,height:50}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.messengerBtn}>
                                <Image source={require('../img/icons/btns/messenger.png')} style={{width:50,height:50}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.locationBtn} onPress={()=>this.setState({showMap:!showMap})}>
                                <View style={styles.cirecleBtn}>
                                    {showMap?
                                    <Image source={require('../img/icons/detailsScreen/showImage.png')} style={{width:24,height:24}}/>
                                    :
                                    <Image source={require('../img/icons/detailsScreen/location.png')} style={{width:32,height:32}}/>
                                    }
                                </View>
                                <View style={styles.textConteinerBtn}>
                                    <Text style={styles.textBtn}>Киев</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.likeBtn} onPress={()=>this.setState({likes:!likes})}>
                                <View style={styles.cirecleBtn}>
                                    {likes?
                                    <Image source={require('../img/icons/detailsScreen/likeActive.png')} style={{width:26,height:24}}/>:
                                    <Image source={require('../img/icons/detailsScreen/noLike.png')} style={{width:26,height:24}}/>
                                    }

                                </View>
                                <View style={styles.textConteinerBtn}>
                                    <Text style={styles.textBtn}>500</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Animated.View style={[styles.mainConteiner,{transform: [{translateY: toTop}],}]} >
                            {this.props.children}
                        </Animated.View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    conteinerImageSlider: {
        maxWidth:width,
        maxHeight:width,
        width:width,
        height: width
    },
    mainConteiner: {
        width:width,
        zIndex:500,
        position: 'relative',
        top: -width - 30,
        height: height - 130,
    },
    backBtn: {
        width:60,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:0,
        left:0
    },
    messengerBtn: {
        width:60,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:0,
        right:0
    },
    cirecleBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(217, 217, 217, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationBtn: {
        position: 'absolute',
        top: width - 100,
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textConteinerBtn: {
        width:70,
        height: 20,
        backgroundColor: 'rgba(217, 217, 217, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        position: 'relative',
        top: -10
    },
    textBtn: {
        fontSize: 12,
        color: '#644800'
    },
    likeBtn: {
        position: 'absolute',
        top: width - 100,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps)(withNavigation(Conteiner));