import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image,ImageBackground,Dimensions,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import InfoUser from '../top/infoAboutUsers';
import Ocenka from '../top/ocenka';
import SocialLink from '../details/socialLink';


const { width, height } = Dimensions.get('window');

class DetailsUser extends Component{

    render(){

        return(
            <ImageBackground source={require('../img/background/background1.jpg')} style={styles.background}>
                <ScrollView>
                    <View style={styles.conteiner}>
                        <View style={styles.headerConteiner}>
                            <TouchableOpacity style={styles.headerBtnConteiner} onPress={()=>this.props.navigation.goBack()}>
                                <Image source={require('../img/icons/btns/btnBack.png')} style={styles.headerBtnImg}/>
                            </TouchableOpacity>
                            <View style={styles.headerTextConteiner}>
                                <Text numberOfLines={1} style={styles.headerText}>nick name kmef</Text>
                            </View>
                        </View>
                        <View style={styles.mainConteiner}>
                            <InfoUser/>
                            <View style={styles.ocenkaConteiner}>
                                <Ocenka/>
                                <TouchableOpacity>
                                    <Image style={{width: 50,height: 50}} source={require('../img/icons/detailsPersonalAcc/btnAdd.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.moreText}>
                            Material is an adaptable system of guidelines, components, and tools that support the best practices of user interface design. Backed by open-source code, Material streamlines collaboration between designers and developers, and helps teams quickly build beautiful products.
                            </Text>
                            <View style={styles.socialLinkConnteiner}>
                                <SocialLink/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%'
    },
    headerConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: 60,
        borderBottomColor: '#644800',
        borderBottomWidth: 3
    },
    headerBtnImg: {
        width: 50,
        height: 50
    },
    headerBtnConteiner: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextConteiner: {
        width: width - 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    },
    headerText: {
        fontSize: 22,
        color: '#644800',
        letterSpacing: 0.5
    },
    mainConteiner: {
        width: width,
        alignItems: 'center',
        paddingTop: 10
    },
    ocenkaConteiner: {
        width: width - 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    moreText: {
        width: width -40,
        fontSize: 16,
        color: '#644800',
        marginTop: 10
    },
    socialLinkConnteiner: {
        height: 140,
        justifyContent: 'center',
        alignItems: "center"
    }
})

const mapStateToProps = (state) => {
    return {
    }
  }

export default connect(mapStateToProps)(withNavigation(DetailsUser));

