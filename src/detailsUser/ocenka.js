import React,{Component} from 'react';
import {View,Image,TouchableOpacity,StyleSheet,Text} from 'react-native';
import { connect } from 'react-redux';

class Ocenka extends Component{

    state = {
        ocenka: 0
    }

    setNewOcenca = (newOcenka) => {
        const {ocenka} = this.state;
        if(ocenka === newOcenka){
            this.setState({ocenka: 0})
        }else{
            this.setState({ocenka:newOcenka})
        }
    }

    renderStar = (number) => {
        let req, color;
        if(number == 1) {req = require('../img/icons/detailsPersonalAcc/Star1.png'); color='#CB0000';}
        if(number == 2) {req = require('../img/icons/detailsPersonalAcc/Star2.png'); color='#E8BC4D';}
        if(number == 3) {req = require('../img/icons/detailsPersonalAcc/Star3.png'); color='#FFF960';}
        if(number == 4) {req = require('../img/icons/detailsPersonalAcc/Star4.png'); color='#ADFF00';}
        if(number == 5) {req = require('../img/icons/detailsPersonalAcc/Star5.png'); color='#00FF29';}
        if(number == this.state.ocenka){req = require('../img/icons/detailsPersonalAcc/Star.png');}

        return(
            <TouchableOpacity style={[styles.starConteiner, this.state.ocenka == number?{backgroundColor:color}:null]}
                             onPress={()=>this.setNewOcenca(number)}>
                <Image source={req} style={styles.starImage}/>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.ocenkaConteiner}>
                    <View style={styles.starsConteiner}>
                        {this.renderStar(1)}
                        {this.renderStar(2)}
                        {this.renderStar(3)}
                        {this.renderStar(4)}
                        {this.renderStar(5)}
                    </View>

                    <View style={styles.ocenkaTextConteiner}>
                        <Text style={styles.ocenksText}>50</Text>
                        <Text style={styles.ocenksText}>100</Text>
                        <Text style={styles.ocenksText}>5</Text>
                        <Text style={styles.ocenksText}>200</Text>
                        <Text style={styles.ocenksText}>100</Text>
                    </View>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    ocenkaConteiner: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    starsConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 255,
        height: 40,
        borderColor: '#009D6E',
        borderWidth: 2.5,
        borderRadius: 10,
        overflow: 'hidden'
    },
    starConteiner: {
        width: 50,
        height: 40,
        borderRightColor: '#009D6E',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#644800'
    },
    starImage: {
        width: 34,
        height: 34
    },
    ocenkaTextConteiner: {
        width: 255,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    ocenksText: {
        fontSize: 17,
        color: '#644800',
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center'
    }
})

export default connect()(Ocenka)