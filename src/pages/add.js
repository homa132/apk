import React,{Component} from 'react';
import {View,Text,StyleSheet,ScrollView,Dimensions,ImageBackground,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {setTextDate} from '../redux/actions';
import Conteiner from '../conteiners/conteinerAddScreen'

const { width, height } = Dimensions.get('window');


class Add extends Component{

    state = {
        scrollEnd: 0
    }

    render(){
        const {scrollEnd} = this.state;

        return (
                <Conteiner scrollEnd={scrollEnd}>
                    <ImageBackground source={require('../img/background/background1.jpg')} style={styles.backgroundConteiner}>
                        <View style={styles.line}></View>
                        <ScrollView onMomentumScrollEnd={(e)=>this.setState({scrollEnd:e.nativeEvent.contentOffset.y})}>
                            <View style={styles.conteiner} >
                                <TextInput placeholder='название события' placeholderTextColor='#644800' style={styles.nameInput}
                                        numberOfLines={1}/>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </Conteiner>
        )
    }
};

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
    },
      line: {
        width: 60,
        borderColor: '#644800',
        borderWidth: 2,
        borderRadius: 2,
        marginTop: 12,
        marginLeft:width/2-30,
        marginBottom:10
    },
    backgroundConteiner: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
    },
    nameInput: {
        width: 240,
        fontSize: 18,
        color: '#644800',
        borderRadius: 10,
        borderColor: '#644800',
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingVertical: 2.5,
        marginTop: 20
    }
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setTextDate: (name,value) => dispatch(setTextDate(name,value))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Add);