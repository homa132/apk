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
        const {my} = this.props;

        if(number == 1) {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star1Fill.png'); color='#CB0000';}
            else{req = require('../img/icons/detailsPersonalAcc/Star1.png'); color='#CB0000';}}

        if(number == 2) {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star2Fill.png'); color='#E8BC4D';}
            else{req = require('../img/icons/detailsPersonalAcc/Star2.png'); color='#E8BC4D';}}

        if(number == 3) {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star3Fill.png'); color='#FFF960';}
            else{req = require('../img/icons/detailsPersonalAcc/Star3.png'); color='#FFF960';}}

        if(number == 4) {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star4Fill.png'); color='#ADFF00';}
            else{req = require('../img/icons/detailsPersonalAcc/Star4.png'); color='#ADFF00';}}

        if(number == 5) {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star5Fill.png'); color='#00FF29';}
            else{req = require('../img/icons/detailsPersonalAcc/Star5.png'); color='#00FF29';}}

        if(number == this.state.ocenka){req = require('../img/icons/detailsPersonalAcc/Star.png');}

        return(
            <TouchableOpacity style={[styles.starConteiner, this.state.ocenka == number?{backgroundColor:color}:null]}
                             onPress={()=>this.setNewOcenca(number)} disabled={my}>
                <Image source={req} style={styles.starImage}/>
            </TouchableOpacity>
        )
    }

    render(){
        const {ocenka} = this.props;
        
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
                    <Text style={styles.ocenksText}>{ocenka.one}</Text>
                    <Text style={styles.ocenksText}>{ocenka.two}</Text>
                    <Text style={styles.ocenksText}>{ocenka.three}</Text>
                    <Text style={styles.ocenksText}>{ocenka.four}</Text>
                    <Text style={styles.ocenksText}>{ocenka.five}</Text>
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