import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import DateBtn from './dateBtn';
import TypeBtn from './typeBtn';
import {filterList} from '../redux/actions';


class filterBtn extends Component{

    state = {
        date: 'default',
        type: 'default'
    }


    filterData = (name,value) => {
        name == 'date'?this.setState({date: value}):null;
        name == 'type'?this.setState({type: value}):null;
    }

    render(){
        const {date,type} = this.state;
        this.props.filterList(date,type);

        return (
            <View style={styles.conteiner}>
                <DateBtn 
                filterData={this.filterData}
                />
                <View style={styles.line}></View>
                <TypeBtn
                filterData={this.filterData}
                />
            </View>
        )
    }
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

mapDispatchToProps = (dispatch) => {
    return {
        filterList: (date,type) => dispatch(filterList(date,type))
    }
}

export default connect(null,mapDispatchToProps)(filterBtn);
