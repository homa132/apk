import {FILTER_LIST,SET_ACTIVE_ITEM,GET_MY_DATA,
    SET_NEW_DATA,SET_NEW_IMAGES} from './const';

//import for get data from database
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';



export const filterList = (date,category) => {
    return {
        type: FILTER_LIST,
        date,category
    }
}


//active item
export const setActiveItem = (heshItem) => {
    return {
        type: SET_ACTIVE_ITEM,
        heshItem
    }
}

// create new
export const setNewData = (value,name,secondName) => {
    return {
        type: SET_NEW_DATA,
        value,name,secondName
    }
}

export const setImages = (path,operation) => {
    return{
        type: SET_NEW_IMAGES,
        path,operation
    }
}

// get data about my accaunt
export const getMyData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const myData  = await firebase.firestore().collection('users').doc(userToken).get();
    return {
        type: GET_MY_DATA,
        myDataAcc: myData.data()
    }
}