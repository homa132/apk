import React,{Component} from 'react';
import {TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';

import Add from '../icon/nav/add.svg';
import Acc from '../icon/nav/accaunt.svg';
import MapIcon from '../icon/nav/map.svg';
import Likes from '../icon/nav/myLike.svg';
import List from '../icon/nav/list';
const { width, height } = Dimensions.get('window');


let mapScreen = true;

class navBtn extends Component {

    Button = (screen,Icon,widthIcon,heightIcon)=>{
        const {activeScreen} = this.props.navigate;
        const style = {backgroundColor: '#EAEAEA'};
        return (
            <TouchableOpacity style={[styles.conteiner,activeScreen == screen?style:null]}
            onPress={() => {
                screen == 'MainFirst' || screen == 'MainSecond'?mapScreen = !mapScreen:null;
                
                this.props.navigateTo(screen)
                }}>
                <Icon width={widthIcon} height={heightIcon}/>
            </TouchableOpacity>
        )
    }

    render(){
        const {activeScreen} = this.props.navigate;
        const style = {backgroundColor: '#EAEAEA'};
        if(activeScreen != 'MainFirst' && activeScreen != 'MainSecond'){
            mapScreen = false;
        }
        return (
        <React.Fragment>
            {mapScreen?
            <TouchableOpacity style={[styles.conteiner,activeScreen == 'MainFirst'||activeScreen == 'MainSecond'?style:null]}
            onPress={() => {
                    mapScreen = !mapScreen
                    this.props.navigateTo('MainSecond')
                }}>
                <List width={44} height={44}/>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.conteiner,activeScreen == 'MainFirst'||activeScreen == 'MainSecond'?style:null]}
            onPress={() => {
                    mapScreen = !mapScreen
                    this.props.navigateTo('MainFirst')
                }}>
                <MapIcon width={56} height={42}/>
            </TouchableOpacity>
        }
            {this.Button('Add',Add,36,36)}
            {this.Button('Likes',Likes,32,38)}
            {this.Button('Account',Acc,34,36)}
        </React.Fragment>
    )};
};

const styles = StyleSheet.create({
    conteiner: {
        width: width/4 - 5,
        height: 50,
        borderColor: '#969696',
        borderWidth: 2,
        borderRadius: 15,
        marginHorizontal: 2.5,
        backgroundColor: '#13D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    }
})

const mapStateToProps = (state) => {
    return {
      state: state.data,
      navigate: state.navigation
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(navBtn);