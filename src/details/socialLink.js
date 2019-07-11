import React,{Component} from 'react';
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';


class SocailLink extends Component{

    state ={
        showSocial: false,
    }

    render(){

        const {showSocial} = this.state;
        return (
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