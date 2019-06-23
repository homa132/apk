import React,{Component} from 'react';
import {TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {navigateTo} from '../redux/actions';

import Add from '../icon/nav/add.svg';
import Acc from '../icon/nav/accaunt.svg';
import MapIcon from '../icon/nav/map.svg';
import Likes from '../icon/nav/myLike.svg';
import List from '../icon/nav/list';
import AddActive from '../icon/nav/addActive.svg';
import AccActive from '../icon/nav/accauntActive.svg';
import MapIconActive from '../icon/nav/mapActive.svg';
import LikesActive from '../icon/nav/myLikeActive.svg';
import ListActive from '../icon/nav/listActive.svg';

const { width, height } = Dimensions.get('window');


class navBtn extends Component {

    Button = (screen,Icon,IconActive,widthIcon,heightIcon)=>{
        const {activeScreen} = this.props.navigate;
        return (
            <TouchableOpacity style={[styles.conteiner]}
            onPress={() => {
                this.props.navigate.navigation.navigate(screen);
                this.props.navigateTo(screen)
                }}>
                    {activeScreen == screen?<IconActive width={widthIcon} height={heightIcon}/>:
                    <Icon width={widthIcon} height={heightIcon}/>}
            </TouchableOpacity>
        )
    }

    render(){
        
        return (
        <React.Fragment>
            {this.Button('MainFirst',MapIcon,MapIconActive,56,42)}
            {this.Button('MainSecond',List,AddActive,44,44)}
            {this.Button('Add',Add,ListActive,36,36)}
            {this.Button('Likes',Likes,LikesActive,32,38)}
            {this.Button('Acc',Acc,AccActive,34,36)}
        </React.Fragment>
    )};
};

const styles = StyleSheet.create({
    conteiner: {
        width: width/5 - 5,
        height: 50,
        borderColor: '#969696',
        borderWidth: 2,
        borderRadius: 15,
        marginHorizontal: 2.5,
        backgroundColor: '#EAEAEA',
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