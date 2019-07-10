import React, {Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

class DetailsUser extends Component{

    render(){

        return(
            <View style={styles.conteiner}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                    <Text>DetailsUser</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
    }
  }

export default connect(mapStateToProps)(withNavigation(DetailsUser));

