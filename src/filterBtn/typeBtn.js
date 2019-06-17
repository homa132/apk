import React,{Component} from 'react';
import {View,Picker,StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class TypeBtn extends Component {

    state = {
        type: "default"
    }
    
    changeType = (value,index) => {
        this.props.filterData('type',value)
        this.setState({type:value})
    }

    render(){
        
        return (
            <View style={styles.conteinerBtn}>
                <Picker
                selectedValue={this.state.type}
                style={styles.pickerConteiner}
                onValueChange={(itemValue,itemIndex) => this.changeType(itemValue,itemIndex)}
                >
                    <Picker.Item label="Все типы" value="default" />
                    <Picker.Item label="Спорт" value="sport" />
                    <Picker.Item label="IT" value="it" />
                    <Picker.Item label="Клубы" value="club" />
                </Picker>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    conteinerBtn: {
        minWidth: 140,
        height: 40,
        backgroundColor: '#EAEAEA',
        borderColor: '#969696',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    textBtn: {
        fontSize: 17,
        color: '#4F4F4F'
    },
    pickerConteiner: {
        minWidth: 130,
        height: 34
    }
})

export default connect()(TypeBtn)