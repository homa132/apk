import React,{Component} from 'react';
import {View,StyleSheet,Image,TouchableOpacity,Linking} from 'react-native';
import {connect} from 'react-redux';


class SocailLink extends Component{

    state ={
        showSocial: false,
    }

    goToLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    render(){

        const {showSocial} = this.state;
        const {facebook,instagrame,telegrame,webSite} = this.props.contacts;

        console.log('facebook',facebook,'instagrame',instagrame,'telegrame',telegrame,'webSite',webSite);
        console.log(instagrame=='');
        
        return (
            <View style={styles.socialConteiner}>
                {showSocial?
                <React.Fragment>
                    <TouchableOpacity style={[styles.allSocial,instagrame==''?{opacity:0.1}:{opacity:1}]} disabled={instagrame==''}
                        onPress={()=>this.goToLink(instagrame)}>
                        <Image source={require('../img/icons/detailsScreen/inst.png')} style={{width: 30,height:30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.social,telegrame==''?{opacity:0.1}:{opacity:1}]} disabled={telegrame==''}
                        onPress={()=>this.goToLink(telegrame)}>
                        <Image source={require('../img/icons/detailsScreen/telegrame.png')} style={{width: 30,height:30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.social} onPress={()=>this.setState({showSocial:false})} >
                        <Image source={require('../img/icons/detailsScreen/closeMore.png')} style={{width: 50,height:50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.social,webSite==''?{opacity:0.1}:{opacity:1}]} disabled={webSite==''}
                        onPress={()=>this.goToLink(webSite)}>
                        <Image source={require('../img/icons/detailsScreen/web.png')} style={{width: 30,height:30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.allSocial,facebook==''?{opacity:0.1}:{opacity:1}]} disabled={facebook==''} 
                        onPress={()=>this.goToLink(facebook)}>
                        <Image source={require('../img/icons/detailsScreen/facebook.png')} style={{width: 30,height:30}}/>
                    </TouchableOpacity>
                </React.Fragment>
                :
                <TouchableOpacity style={[styles.social,{marginLeft:50}]} onPress={()=>this.setState({showSocial:true})}>
                    <Image source={require('../img/icons/detailsScreen/IconMore.png')} style={{width: 50,height:50}}/>
                </TouchableOpacity>
                }
            </View>
            )
    }
}
const styles = StyleSheet.create({
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
})


export default connect()(SocailLink);