import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {View,Text,TouchableOpacity,Image,StyleSheet,Dimensions} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Map from '../map/map';
import InfoEvent from '../details/infoEvent';

const { width, height } = Dimensions.get('window');

class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: false,
            showMap:false,
            moreText: false
          }
    }

    like = () => {
        const {likes} = this.state;
        this.setState({likes:!likes});
    }
  

    render(){
        
        const {likes,showMap,moreText} = this.state;


        return (
            <View style={styles.eventConteiner}>

                <TouchableOpacity style={styles.eventHeader}>
                    <View style={[styles.imageConteiner,{backgroundColor:'#ADFF00'}]}>
                        <Image source={require('../img/testImage.png')} style={styles.imageUser}/>
                    </View>
                    <Text style={styles.nickText} numberOfLines={1}>nick name user</Text>
                </TouchableOpacity>

                <View style={styles.mainConteiner}>
                    {showMap?<Map one={true} location={{latitude:50.44921745032418,
                    longitude: 30.485897473990917}} autor={{colorAutor: '#00FF29',
                    photoAutor: 'https://lh5.googleusercontent.com/-TtBD0qG1kcI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rctNo1tXcBbaJwVMJp1zF-cKTZdSg/s96-c/photo.jpg'}}/>:
                    <ImageSlider
                    loop
                    images={['https://imgclf.112.ua/original/2015/12/15/199925.PNG?timestamp=1450192509',
                    'https://lumpics.ru/wp-content/uploads/2018/03/Prilozhenie-Google-ostanovleno-kak-ispravit.png']}
                    customSlide={({ index, item, style }) => (
                    <Image source={{ uri: item }} style={{width:width,height:width}} key={index}/>
                    )}
                    />
                    }
                </View>
                
                <View style={styles.mainBtnsConteiner}>

                    <TouchableOpacity style={styles.btnConteiner} onPress={()=>this.setState({showMap:!showMap})}>
                        <View style={styles.imageBtnConteiner} >
                        {showMap?
                            <Image source={require('../img/icons/detailsScreen/showImage.png')} style={{width:24,height:24}}/>
                            :
                            <Image source={require('../img/icons/detailsScreen/location.png')} style={{width:32,height:32}}/>
                            }
                        </View>
                        <View style={styles.btnTextConteiner}>
                            <Text style={styles.btnText} numberOfLines={1}>Киев</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnConteiner} onPress={()=>this.like()}>
                        <View style={styles.imageBtnConteiner} >
                        {likes?
                            <Image source={require('../img/icons/detailsScreen/likeActive.png')} style={{width:26,height:24}}/>:
                            <Image source={require('../img/icons/detailsScreen/noLike.png')} style={{width:26,height:24}}/>
                            }
                        </View>
                        <View style={styles.btnTextConteiner}>
                            <Text style={styles.btnText} numberOfLines={1}>500</Text>
                        </View>
                    </TouchableOpacity>

                </View>


                <View style={styles.infoEventConteiner}>

                    <View style={styles.topInfoConteiner}>
                        <Text numberOfLines={3} style={styles.topInfoText}>Турнир с футбoла для школьников</Text>
                        <TouchableOpacity style={styles.topInfoBtn}>
                            <Text style={styles.topInfoBtnText}>поделиться</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mainInfoConteiner}>
                        <InfoEvent/>
                        <TouchableOpacity style={styles.mainInfoBtn} onPress={() => this.props.navigation.push('Messenger')}>
                            <Image source={require('../img/icons/btns/messenger.png')} style={{width:40,height: 40}}/>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.moreTextConteiner}>
                        {moreText?
                        <Text style={styles.moreTextSecond}>dsvdsv  ds v dsvd vdsv d svd  svdsv dsvdsvds</Text>
                        :
                        <React.Fragment>
                            <Text numberOfLines={1} style={styles.moreTextFirst}>dsvdsv  ds v dsvd vdsv d svd  svdsvdsvdsvds</Text>
                            <TouchableOpacity onPress={() => this.setState({moreText: true})}>
                            <Text numberOfLines={1} style={styles.moreBtn}>ещё</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                        }

                    </View>
                    
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(Event));



const styles = StyleSheet.create({
    eventConteiner: {
      width:width,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 0,
      margin: 0
    },
    eventHeader: {
      width: width - 50,
      height: 55,
      borderColor: '#E8BC4D',
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor: 'rgba(217, 217, 217, 0.7)',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      top: 15,
      zIndex: 1000,
      margin: 0
    },
    imageConteiner: {
      width: 42,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 10
    },
    imageUser: {
      width: 38,
      height: 38,
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1
    },
    nickText: {
      fontSize: 20,
      color: 'black',
      marginLeft: 20
    },
    mainConteiner: {
      width: width,
      height: width,
      borderRadius: 10,
      overflow: 'hidden'
    },
    mainBtnsConteiner: {
      width: width - 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: -70
    },
    imageBtnConteiner: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'rgba(217, 217, 217, 0.9)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnTextConteiner: {
      width: 70,
      height: 20,
      backgroundColor: 'rgba(217, 217, 217, 0.9)',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      top: -3,
      zIndex: 600
    },
    btnConteiner: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnText: {
      fontSize: 12,
      color: '#644800'
    },
    infoEventConteiner: {
      width: width - 40,
      borderRadius: 10,
      borderColor: '#E8BC4D',
      borderWidth: 2,
      alignItems: 'center',
      backgroundColor: 'rgba(217, 217, 217, 0.85)',
      paddingVertical: 10,
    },
    topInfoConteiner: {
      width: width - 70,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
    topInfoText: {
      width: width - 190,
      fontSize: 16,
      color: '#644800',
      textAlign: 'center'
    },
    topInfoBtn: {
      width: 100,
      height: 30,
      backgroundColor: '#644800',
      borderRadius: 7,
      borderColor: '#E8BC4D',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topInfoBtnText: {
      color: '#FFF960',
      fontSize: 14
    },
    mainInfoConteiner: {
      width: width - 70,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    mainInfoBtn: {
      width:45,
      height: 45,
    },
    moreTextFirst: {
      width: width - 100,
      fontSize: 15,
      color: '#644800'
    },
    moreTextConteiner: {
      width: width - 60,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    moreBtn: {
      color: 'black',
      fontSize: 15
    },
    moreTextSecond: {
      width: width - 60,
      fontSize: 15,
      color: '#644800'
    }
  });