import React,{Component} from 'react';
import {View,ActivityIndicator,Dimensions} from 'react-native';
import firebase from 'react-native-firebase';
import Event from '../main/event';

const { width, height } = Dimensions.get('window');

class Loader extends Component {
    constructor(props){
        super(props);
        this.state = {
            loader: true,
            data: false
        }
    }

    componentDidMount(){
        firebase.firestore().collection('Events').doc(this.props.hesh).get().then(i => {
            this.setState({loader: false,data: i.data()})
        })
        
    }

    render(){
        if(this.state.loader){
            return (
                <View style={{width: width,height: 250,justifyContent: 'center',alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#644800" />
                </View>
            )
        }else{
            return (
                <View style={{marginBottom: 7}}>
                    <Event item={this.state.data}/>
                </View>
            )
        }
    }
}

export default Loader;