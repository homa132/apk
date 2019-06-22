import React,{Component} from 'react';
import {TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SaveI from '../icon/btn/save.svg';
import firebase from 'react-native-firebase';
import {setInitialState} from '../redux/actions';

class SaveBtn extends Component{
    constructor(props){
        super(props);
        this.storageRef = firebase.storage().ref();
        this.data = firebase.firestore();
        this.state = {
            disabled: true
        }
    }

    save = async () => {
        this.props.setInitialState();
        this.setState({disabled: true});
        const {images} = this.props.state
        let savePhoto = true;
        let urlImages = []
        while(savePhoto){
            for(let i = 0;i<images.length;i++){
                let url = await  this.storageRef.child(`list/${images[i].name}`).put(images[i].path);
                urlImages.push(url.downloadURL);
            }
            if(urlImages.length == images.length){
                savePhoto = false;
            }
        }

        const heshItem = Math.floor(Math.random()*100000000).toString();

        await this.data.collection('list').doc(heshItem).set({...this.props.state,urlImages,heshItem});

    }

    changeState = () => {
        const {name,location:{latitude,longitude},moreText,type,date,time,locationText,images} = this.props.state;
        const change = (object) => {
            if(object === ''){
                return true
            }else{
                return false
            }
        }
        if(change(locationText)||change(name)||change(latitude)||change(longitude)||change(moreText)||
            type === "default"||date === 'Дата события'||time ==='Время события'||!images.length){
                this.state.disabled == true?null:this.setState({disabled:true});
        }else{
            this.state.disabled == false?null:this.setState({disabled:false});
        }
        
    }

    componentDidUpdate(){
        this.changeState();
    }

    render(){
        return (
            <TouchableOpacity onPress={()=>this.save()} disabled={this.state.disabled} style={this.state.disabled?{opacity: 0.3}:{opacity:1}}>
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
mapDispatchToProps = (dispatch) => {
    return {
        setInitialState: () => dispatch(setInitialState())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SaveBtn);