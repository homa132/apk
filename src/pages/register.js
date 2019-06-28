import React, {Component} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,TextInput} from 'react-native';
import {connect} from 'react-redux';

class Register extends Component{
    
    state = {
        email: '',
        password: ''
    }


    render(){
        return (
            <View style={styles.conteiner}>
                <Text>Регистрация</Text>
                <TextInput placeholder='Введите e-mail' value={this.state.email}
                    onChangeText={(email) => this.setState({email})}/>
                <TextInput placeholder='Введите пароль' value={this.state.password}
                    onChangeText={(password) => this.setState({password})}/>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Auth')}>
                    <Text>Вход</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default connect()(Register);
