import React from 'react';
import {View,TextInput,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {setTextDate} from '../redux/actions';

const { width, height } = Dimensions.get('window');

function NameInput (props) {
    
    return (
        <View style={styles.conteiner}>
            <TextInput onChangeText={(name) => props.setTextDate('name',name)}
                        value={props.state.name} style={styles.nameText}
                        placeholder="Название события"
                        />
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner: {
        justifyContent:'center'
        ,alignItems: 'center'
        ,width: width
    },
    nameText: {
        borderBottomColor: '#11A1A1',
        borderBottomWidth: 2,
        width: width - 100,
        marginTop: 20,
        fontSize: 17
    },
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

export default connect(mapStateToProps,mapDispatchToProps)(NameInput);