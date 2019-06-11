import React from 'react';
import {View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import DateBtn from './dateBtn';
import TypeBtn from './typeBtn';

function filterBtn(){
        return (
            <View style={styles.conteiner}>
                <DateBtn/>
                <View style={styles.line}></View>
                <TypeBtn/>
            </View>
        )
}

const styles = StyleSheet.create({
    conteiner: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    line: {
        borderColor: '#11A1A1',
        borderWidth:1.4
    }
})

export default connect()(filterBtn);
