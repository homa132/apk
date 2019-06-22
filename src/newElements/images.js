import React from 'react';
import {ScrollView,TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
import {connect} from 'react-redux';
import {addImage} from '../redux/actions';
import AddPhotoI from '../icon/btn/addPhoto.svg';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

function Images (props) {
    
    const changeImage = () => {
          ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            quality: 0.7,
            noData: true
          },(value)=> {
              props.addImage(value.fileName,`file://${value.path}`)
          })
    }
    return (
        <ScrollView horizontal={true} style={[styles.imagesConteiner,!props.state.images.length?{width: 120,alignSelf: 'center'}:{width:width - 20}]}>

            <TouchableOpacity onPress={()=>changeImage()}
                style={styles.addPhotoConteiner}>
                <AddPhotoI/>
            </TouchableOpacity>
            {props.state.images.map((item,index)=> {
                return(
                    <Image style={styles.image} 
                    source={{uri: item.path}}
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
    },
    addPhotoConteiner: {
        width: 120,
        height: 120,
    },
    image: {
        height: 120,
        width: 120,
        marginLeft: 10,
        borderRadius: 10,
        borderColor: '#11A1A1',
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
        addImage: (name,path) => dispatch(addImage(name,path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Images);