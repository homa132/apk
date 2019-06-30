import React,{Component} from 'react';
import {View,TouchableOpacity,StyleSheet,Text,Dimensions,ScrollView} from 'react-native';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');

const types = [{label:'Все типы',value:"default"},{label:"Спорт", value:"sport"},
            {label:"IT", value:"it"},{label:"Клубы", value:"club"},{label:"Музыка", value:"music"}]

class TypeBtn extends Component {

    state = {
        type: "default"
    }
    
    changeType = (value) => {
        this.props.filterData('type',value)
        this.setState({type:value})
    }


    render(){
        
        const {type} = this.state;

        return (
            <ScrollView horizontal={true} style={styles.conteinerBtn} showsHorizontalScrollIndicator={false}>
                    {types.map(({label,value},index)=>{
                        return (
                            <TouchableOpacity onPress={()=>this.changeType(value)} key={index} >
                                <View style={[styles.btn,type==value?{backgroundColor:'#E8BC4D'}:null]}>
                                    <Text style={styles.btnText} numberOfLines={1}>{label}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    conteinerBtn: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingVertical: 10,
    },
    btn: {
        width: 80,
        height:30,
        borderColor: '#644800',
        marginRight:10,
        borderWidth: 1.5,
        backgroundColor: 'rgba(217, 217, 217, 0.7)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 14,
        color: '#644800'
    }
})

export default connect()(TypeBtn)