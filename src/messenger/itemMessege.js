import React from 'react';
import {View,StyleSheet,Text,Image,Dimensions,TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');


function ItemMesseg (props){

    const {item,myHesh,data,index} = props;
        return (
            <View style={styles.conteinerMess}>
                {index!=0&&data.autor.autorHesh == item.autor.autorHesh?
                    <View style={styles.imageUser}>
                    </View>:
                    <TouchableOpacity>
                        <Image style={styles.imageUser} source={{uri: item.autor.autorImage}}/>
                    </TouchableOpacity>
                }
    
                <View style={[styles.conteinerTextMesseg,myHesh == item.autor.autorHesh?{borderColor: '#644800',borderWidth: 2}:null]}>
                    <Text style={styles.textMesseg}>
                        {item.messege}
                    </Text>
                </View>
            </View>
        )
    

}

const styles = StyleSheet.create({
    conteinerMess: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        marginBottom: 7
    },
    conteinerTextMesseg: {
        width: width - 100,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginLeft: 10
    },
    imageUser: {
        width: 40,
        height: 40,
        borderRadius: 7
    },
    textMesseg: {
        fontSize: 17,
        color: '#644800'
    }
})

mapStateToProps = (state) => {
    return {
        myHesh: state.data.myDataAcc.heshUser,
    }
}

export default connect(mapStateToProps)(withNavigation(ItemMesseg));