import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';


import Mess from '../icon/item/Messanger.svg';
import DateI from '../icon/item/calendar.svg';
import CategI from '../icon/item/category.svg';
import TimeI from '../icon/item/time.svg';
import Up from '../icon/item/up.svg';
import Down from '../icon/item/down.svg';
import UpAll from '../icon/item/upActive.svg';
import DownAll from '../icon/item/downActive.svg';

const { width, height } = Dimensions.get('window');




class Item extends Component {

    state = {
        like: false,
        dithlike: false
    }

    change = (value) => {
        const {like,dithlike} = this.state;
        if(like && value == 'dithlike'){
            this.setState({dithlike:!dithlike,like: false})
        }
        if(dithlike && value == 'like'){
          this.setState({like: !like,dithlike: false})
        }
        if(!like && value == 'dithlike'){
          this.setState({dithlike:!dithlike})
        }
        if(!dithlike && value == 'like'){
          this.setState({like: !like})
        }
    }

    more = () => {
        this.props.navigateTo('Details');
    }
    
    messanger = () => {
        this.props.navigateTo('Messenger');
    }

    render(){
        const {like,dithlike} = this.state;
        const {name,heshMessenger,date,time,category} = this.props.item;
        
        return (
            <View style={styles.conteiner}>
                <View style={styles.itemTop}>
                    <Text style={styles.itemName} numberOfLines={3}>{name}</Text>
                    <TouchableOpacity style={styles.btnMessConteiner}
                    onPress={this.messanger}>
                             <Mess/>
                    </TouchableOpacity>
                </View>
    
                <View style={styles.images}>
                </View>
    
                <View style={styles.infoStyle}>
                    <View style={styles.infoItem}>
                        <DateI/>
                        <View style={{alignItems: 'center', justifyContent: 'center',width: '90%'}}>
                            <Text style={styles.infoText}>{date}</Text>
                        </View>
                    </View>
                    <View style={styles.infoItem}>
                        <CategI/>
                        <View style={{alignItems: 'center', justifyContent: 'center',width: '90%'}}>
                            <Text style={styles.infoText}>{category}</Text>
                        </View>
                    </View>
                    <View style={styles.infoItem}>
                        <TimeI/>
                        <View style={{alignItems: 'center', justifyContent: 'center',width: '90%'}}>
                            <Text style={styles.infoText}>{time}</Text>
                        </View>
                    </View>
                </View>
    
                <View style={styles.buttom}>
                    <View style={styles.btns}>
                        <TouchableOpacity style={ like?null:{marginBottom:2}}
                        onPress={() => this.change('like')}>
                            {like?<UpAll/>:<Up/>}
                        </TouchableOpacity>
                        <View style={{borderColor: '#11A1A1',borderWidth: 1,height:40}}></View>
                        <TouchableOpacity style={dithlike?null:{marginTop:2}}
                        onPress={() => this.change('dithlike')}>
                            {dithlike?<DownAll/>:<Down/>}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnMore}
                    onPress={this.more}>
                        <Text style={styles.btnMoreText}>Подробнее</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    conteiner: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width,
        marginBottom: 25,
        borderTopColor: '#13D9D9',
        borderTopWidth: 1.4,
        paddingTop: 15,
    },
    itemTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 15,
    },
    itemName: {
        color: '#11A1A1',
        fontSize: 16,
        lineHeight: 15,
        maxWidth: width - 80,
        textAlign: 'center'
    },
    btnMessConteiner: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMess: {
        borderColor: '#4F4F4F',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        width: width,
        height: width,
        backgroundColor: '#C0C0C0',
        marginVertical: 10,
    },
    infoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 25,
        width: 140,
        borderColor: '#969696',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    infoText: {
        fontSize: 13,
        color: '#4F4F4F',
        letterSpacing: 0.5,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    buttom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        width: width
    },
    btns: {
        flexDirection: 'row',
        width: 120,
        height: 40,
        borderColor: '#11A1A1',
        borderWidth: 1.5,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#EAEAEA'

    },
    btnMore: {
        width: 140,
        height: 40,
        borderColor: '#11A1A1',
        borderWidth:2,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAEAEA'
    },
    btnMoreText: {
        color: '#4F4F4F',
        fontSize: 16,
        letterSpacing:1
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
  }

export default connect (null,mapDispatchToProps)(Item);