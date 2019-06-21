import React from 'react';
import {View,Picker,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {changeCategory} from '../redux/actions';
import CategoryI from '../icon/item/category.svg';

function ChangeCategory (props) {
    return (
        <View style={styles.typeConteiner}>
            <CategoryI/>
            <Picker selectedValue={props.state.type} onValueChange={(type,index)=>{props.changeCategory(type)}}
                    style={styles.pickerType}>
                <Picker.Item label="Тип события" value="default" />
                <Picker.Item label="Спорт" value="sport" />
                <Picker.Item label="IT" value="it" />
                <Picker.Item label="Клубы" value="club" />
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    typeConteiner: {
        width: 180,
        height: 30,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#13D9D9',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginTop: 20
    },
    pickerType: {
        width: 140,
        height: 28,
    },
})

const mapStateToProps = (state) => {
    return {
      state: state.new
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        changeCategory: (type) => dispatch(changeCategory(type))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeCategory);