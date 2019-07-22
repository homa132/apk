import React,{Component} from 'react';
import {TouchableOpacity,StyleSheet,Text,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

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
                                <LinearGradient colors={type==value?['#FFF960','#E8BC4D']:['#F3F3F3','#D9D9D9']} 
                                                style={[styles.btn,type==value?{opacity:1}:{opacity:0.8}]}>
                                    <Text style={styles.btnText} numberOfLines={1}>{label}</Text>
                                </LinearGradient>
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
        height: 44,
        flexDirection: 'row',
        paddingLeft: 5,
    },
    btn: {
        width: 80,
        height:30,
        borderColor: '#644800',
        marginRight:10,
        borderWidth: 1.5,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnText: {
        fontSize: 14,
        color: '#644800'
    }
})

export default connect()(TypeBtn)