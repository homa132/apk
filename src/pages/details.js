import React,{Component} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import {connect} from 'react-redux';
import NavBtn from '../navBtn/navBtn';
import {navigateTo} from '../redux/actions';


class Details extends Component{


    render(){
        return (
            <View style={styles.container}>
                <Text>Details</Text>
                <Button
                title='Back'
                onPress={() => this.props.navigateTo('Back')}/>
                <View style={styles.bottomNav}>
                    <NavBtn/>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
      }
})


const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: (screen) => dispatch(navigateTo(screen))
    }
}

export default connect(null,mapDispatchToProps)(Details);