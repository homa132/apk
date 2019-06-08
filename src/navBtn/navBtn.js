import React from 'react';
import {Image,TouchableOpacity,Text,StyleSheet,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

export default function navBtn (props) {
    console.log(props);
    
    return (
        <React.Fragment>
            <TouchableOpacity style={styles.conteiner}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.conteiner}>
                <Text>Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.conteiner}>
                <Text>Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.conteiner}>
                <Text>Button</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    conteiner: {
        width: width/4 - 5,
        height: 50,
        borderColor: '#969696',
        borderWidth: 2,
        borderRadius: 15,
        marginHorizontal: 2.5,
        backgroundColor: '#EAEAEA'
    }
})