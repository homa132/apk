import React from 'react';
import {ScrollView,StyleSheet,View,Dimensions,FlatList} from 'react-native';
import {connect} from 'react-redux';
import Item from './mainSecondItem';
import FilterBtn from '../filterBtn/filterBtn';
const { width, height } = Dimensions.get('window');


function List (props) {
    return (
            <ScrollView style={styles.conteiner}>
                <View style={styles.header}>
                    <FilterBtn/>
                </View>
                <FlatList
                // props.state.list - data 
                keyExtractor={(item,index) => `${item.hesh} + ${index}`}
                data={props.state.testList}
                renderItem={({item}) => <Item item={item}/>}
                />
                <View style={{width: width,height: 40}}></View>
            </ScrollView>

    )
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: 'transparent',
    },
    header: {
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 10,

    }
})

mapStateToProps = (state) => {
    return {
        state: state.data
    }
}

export default connect(mapStateToProps)(List);