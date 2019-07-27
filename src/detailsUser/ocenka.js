import React,{Component} from 'react';
import {View,Image,TouchableOpacity,StyleSheet,Text} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class Ocenka extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newOcenka: 'defoult',
            disabled: false,
            one: props.one.length,
            two: props.two.length,
            three: props.three.length,
            four: props.four.length,
            five: props.five.length
        }
    }


    componentDidMount = () => {
        const {one,two,three,four,five,heshUser,myHeshUser} = this.props;
        
        const oneS =one.find(hesh=>hesh == myHeshUser);
        const twoS =two.find(hesh=>hesh == myHeshUser);
        const threeS =three.find(hesh=>hesh == myHeshUser);
        const fourS =four.find(hesh=>hesh == myHeshUser);
        const fiveS =five.find(hesh=>hesh == myHeshUser);

        oneS?this.setState({newOcenka: 'one'}):null;
        twoS?this.setState({newOcenka: 'two'}):null;
        threeS?this.setState({newOcenka: 'three'}):null;
        fourS?this.setState({newOcenka: 'four'}):null;
        fiveS?this.setState({newOcenka: 'five'}):null;
    }

    setNewOcenca = async (setOcenka) => {
        const {one,two,three,four,five,heshUser,myHeshUser} = this.props;
        const {newOcenka} = this.state;
        
        if(newOcenka == 'defoult'){
            console.log('first');
            
            this.setState({newOcenka: setOcenka,disabled: true,
                [setOcenka]: this.state[setOcenka] + 1});
                
            await firebase.firestore().collection('users').doc(heshUser).update({
                [setOcenka]:firebase.firestore.FieldValue.arrayUnion(myHeshUser) 
            })
            this.setState({disabled: false})
        }

        if(newOcenka == setOcenka){
            console.log('second');

            this.setState({newOcenka: 'defoult',disabled: true,
            [setOcenka]: this.state[setOcenka] - 1});

            await firebase.firestore().collection('users').doc(heshUser).update({
                [setOcenka]: firebase.firestore.FieldValue.arrayRemove(myHeshUser)
            })
            this.setState({disabled: false})
        }

        if(newOcenka != setOcenka && newOcenka != 'defoult'){
            console.log('three');

            this.setState({newOcenka: setOcenka,disabled: true,
                [setOcenka]: this.state[setOcenka] + 1,
                [newOcenka]: this.state[newOcenka] - 1}
            );
            
            await firebase.firestore().collection('users').doc(heshUser).update({
                [setOcenka]: firebase.firestore.FieldValue.arrayUnion(myHeshUser),
                [newOcenka]: firebase.firestore.FieldValue.arrayRemove(myHeshUser)})

            this.setState({disabled: false})
        }
    }

    renderStar = (number) => {
        let req, color;
        const {my} = this.props;
        const {disabled} = this.state;

        if(number == 'one') {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star1Fill.png'); color='#CB0000';}
            else{req = require('../img/icons/detailsPersonalAcc/Star1.png'); color='#CB0000';}}

        if(number == 'two') {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star2Fill.png'); color='#E8BC4D';}
            else{req = require('../img/icons/detailsPersonalAcc/Star2.png'); color='#E8BC4D';}}

        if(number == 'three') {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star3Fill.png'); color='#FFF960';}
            else{req = require('../img/icons/detailsPersonalAcc/Star3.png'); color='#FFF960';}}

        if(number == 'four') {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star4Fill.png'); color='#ADFF00';}
            else{req = require('../img/icons/detailsPersonalAcc/Star4.png'); color='#ADFF00';}}

        if(number == 'five') {
            if(my){req = require('../img/icons/detailsPersonalAcc/Star5Fill.png'); color='#00FF29';}
            else{req = require('../img/icons/detailsPersonalAcc/Star5.png'); color='#00FF29';}}

        if(number == this.state.newOcenka){req = require('../img/icons/detailsPersonalAcc/Star.png');}

        return(
            <TouchableOpacity style={[styles.starConteiner, this.state.newOcenka == number?{backgroundColor:color}:null]}
                             onPress={()=>this.setNewOcenca(number)} disabled={my||disabled}>
                <Image source={req} style={styles.starImage}/>
            </TouchableOpacity>
        )
    }

    render(){
        const {one,two,three,four,five} = this.state;
        
        return(
            <View style={styles.ocenkaConteiner}>
                <View style={styles.starsConteiner}>
                    {this.renderStar('one')}
                    {this.renderStar('two')}
                    {this.renderStar('three')}
                    {this.renderStar('four')}
                    {this.renderStar('five')}
                </View>

                <View style={styles.ocenkaTextConteiner}>
                    <Text style={styles.ocenksText}>{one}</Text>
                    <Text style={styles.ocenksText}>{two}</Text>
                    <Text style={styles.ocenksText}>{three}</Text>
                    <Text style={styles.ocenksText}>{four}</Text>
                    <Text style={styles.ocenksText}>{five}</Text>
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

const mapStateToProps = (state) => {
    return{
        myHeshUser: state.data.myDataAcc.heshUser
    }
}

export default connect(mapStateToProps)(Ocenka)