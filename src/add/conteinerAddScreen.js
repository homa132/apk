import React,{Component} from 'react';
import {View,Animated,Easing,Dimensions,StyleSheet,Image,TouchableOpacity} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import {connect} from 'react-redux';
import Map from '../map/map';
import ImagePicker from 'react-native-image-picker';
import {setImages} from '../redux/actions';

const { width, height } = Dimensions.get('window');

class Conteiner extends Component {

    constructor(props){
        super(props);
        this.animatedTop = new Animated.Value (0);
        this.state = {
            scroled: false,
            pageY:0,
            showMap:false,
            showFirst: true
        }
    }

    toTop = () => {
        this.animatedTop.setValue(0);
        Animated.timing(
          this.animatedTop,
          {
            toValue: 1,
            duration: 1000,
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

    addPhoto = () => {
        ImagePicker.launchImageLibrary({
            title: 'Выберите фото',
            mediaType: 'photo',
            maxWidth: 1500,
            maxHeight: 1500,
            quality: 0.8,
            noData: true
        },(image)=> {
            this.props.setImages(image.uri,'add');
            this.setState({showFirst: false});
        })
    }

    removePhoto = () => {
        this.setState({showFirst:true});
        this.props.setImages('','remove');
    }

    componentDidUpdate(){
        if(!this.props.images.length&&!this.state.showFirst){
            this.setState({showFirst:true});
        }
    }

    render(){
        const {pageY,scroled,showMap} = this.state;
        const toTop = this.animatedTop.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 30]
          })
        const {scrollEnd,location,images,autorColor,autorImage} = this.props;
          
        return (
            <View style={styles.conteiner} 
            onStartShouldSetResponder={(e)=>{
                if(e.nativeEvent.pageY>width-40&&!scroled){
                    this.setState({pageY:e.nativeEvent.pageY})
                    return true
                }
                if(scroled&&e.nativeEvent.pageY>30&&scrollEnd <5){
                    this.setState({pageY:e.nativeEvent.pageY})
                    return true
                }
                if(scroled&&e.nativeEvent.pageY>0&&e.nativeEvent.pageY<35){
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
                            {showMap?<Map new={true} location={location} autorImage={autorImage} autorColor={autorColor}/>:
                            <ImageSlider
                            loop
                            images={this.state.showFirst?['https://www.tellerreport.com/images/no-image.png',...images]:[...images]}
                            customSlide={({ index,item }) => (
                                <Image source={{ uri: item }} style={{width:width,height:width}} key={index}/>
                            )}
                            />
                            }
                            
                            <TouchableOpacity style={styles.removeImage} onPress={this.removePhoto}>
                                <View style={styles.removeImageConteiner}>
                                    <Image source={require('../img/icons/addScreen/removeImage.png')} style={{width:32,height:32}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.locationBtn} onPress={()=>this.setState({showMap:!showMap})}>
                                <View style={styles.cirecleBtn}>
                                    {showMap?
                                    <Image source={require('../img/icons/detailsScreen/showImage.png')} style={{width:24,height:24}}/>:
                                    <Image source={require('../img/icons/addScreen/location.png')} style={{width:32,height:32}}/>
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.likeBtn} onPress={this.addPhoto}>
                                <View style={styles.cirecleBtn}>
                                    <Image source={require('../img/icons/addScreen/AddImage.png')} style={{width:32,height:32}}/>
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
        height: '100%',
    },
    removeImageConteiner: {
        width:50,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(217, 217, 217, 0.9)',
        borderRadius:25
    },
    removeImage: {
        width:60,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:0,
        right:0,
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
        top: width - 90,
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
        top: width - 90,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

mapDispatchToProps = (dispatch)=> {
    return {
        setImages: (path,operation)=> dispatch(setImages(path,operation))
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.new.images,
        location: state.new.location,
        autorColor: state.data.myDataAcc.color,
        autorImage: state.data.myDataAcc.urlImg
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Conteiner);