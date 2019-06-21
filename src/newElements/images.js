import React from 'react';
import {ScrollView,TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
import {connect} from 'react-redux';
import {addImage} from '../redux/actions';
import AddPhotoI from '../icon/btn/addPhoto.svg';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

function Images (props) {
    
    const changeImage = () => {
          ImagePicker.launchImageLibrary({},(value)=> {
              console.log(value);
              props.addImage(`file://${value.path}`)
          })
    }
    
    return (
        <ScrollView horizontal={true} style={styles.imagesConteiner}>

            <TouchableOpacity onPress={()=>changeImage()}
                style={styles.addPhotoConteiner}>
                <AddPhotoI/>
            </TouchableOpacity>
            {props.state.images.map((item,index)=> {
                return(
                    <Image style={styles.image} 
                    source={{uri: item}}
                    key={index}/>
                )
            })}

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    imagesConteiner: {
        height: 120,
        marginTop: 25,
        marginHorizontal: 10,
        flexDirection: 'row',
        width: width - 20
    },
    addPhotoConteiner: {
        width: 120,
        height: 120
    },
    image: {
        height: 120,
        width: 120,
        marginLeft: 10,
        borderRadius: 10,
        borderColor: '#13D9D9',
        borderWidth: 1
    },
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addImage: (image) => dispatch(addImage(image))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Images);