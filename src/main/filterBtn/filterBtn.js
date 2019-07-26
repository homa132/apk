import React,{Component} from 'react';
import {connect} from 'react-redux';
import DateBtn from './dateBtn';
import TypeBtn from './typeBtn';
import {setFilter} from '../../redux/actions';


class filterBtn extends Component{

    state = {
        date: 'default',
        type: 'default'
    }

    filterData = (name,value) => {
        name == 'date'?this.setState({date: value}):null;
        name == 'type'?this.setState({type: value}):null;
    }

    componentDidUpdate(prevProps,prevState){
        const {date,type} = this.state;
        if(prevState.type != this.state.type){
            this.props.setFilter('type',type)
        }
        if(prevState.date != this.state.date){
            this.props.setFilter('date',date)
        }
    }

    render(){
        

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


mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (name,value) => dispatch(setFilter(name,value))
    }
}

export default connect(null,mapDispatchToProps)(filterBtn);
