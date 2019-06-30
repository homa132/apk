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
            <React.Fragment>
                <DateBtn 
                filterData={this.filterData}
                />
                <TypeBtn
                filterData={this.filterData}
                />
            </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    
})

mapDispatchToProps = (dispatch) => {
    return {
        filterList: (date,type) => dispatch(filterList(date,type))
    }
}

export default connect(null,mapDispatchToProps)(filterBtn);
