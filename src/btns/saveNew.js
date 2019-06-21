import React,{Component} from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SaveI from '../icon/btn/save.svg';
import firebase from 'react-native-firebase';

class SaveBtn extends Component{
    constructor(props){
        super(props);
        this.storageRef = firebase.storage().ref();
    }

    save = async () => {
        const {images} = this.props.state
        let savePhoto = true;
        let urlImages = []
        while(savePhoto){
            for(let i = 0;i<images.length;i++){
                const url = await  this.storageRef.child('list/image.jpg').put(images[i]);
                urlImages.push(url);
            }
            if(urlImages.length == images.length){
                savePhoto = false;
            }
        }
      console.log(urlImages);
      
    }

    render(){
        return (
            <TouchableOpacity onPress={()=>this.save()}>
                <SaveI/>
            </TouchableOpacity>
        )
    }

}

mapStateToProps = (state) => {
    return {
        state: state.new
    }
}

export default connect(mapStateToProps)(SaveBtn);