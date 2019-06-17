import React,{Component} from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import Up from '../icon/item/up.svg';
import Down from '../icon/item/down.svg';
import UpAll from '../icon/item/upActive.svg';
import DownAll from '../icon/item/downActive.svg';


class LikeDis extends Component{

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

    render(){
        const {like,dithlike} = this.state;

        return (
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
        )
    }
}

const styles = StyleSheet.create({
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
})


export default connect()(LikeDis);