import {FILTER_LIST,SET_ACTIVE,GET_MY_DATA,SET_DEFAULT_STATE,
    SET_NEW_DATA,SET_NEW_IMAGES,SET_ALL_LIST_EVENTS,SET_NEW_MY_DATA,SET_MY_DATA
    } from './const'

export const filterList = (date,category) => {
    return {
        type: FILTER_LIST,
        date,category
    }
}

export const setDataAllEvents = (allList) => {
    return {
        type:SET_ALL_LIST_EVENTS,
        allList
    }
}

//active item
export const setActiveItem = (name,heshItem) => {
    return {
        type: SET_ACTIVE,
        heshItem,name
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

export const setDefaultState = () => {
    return{
        type:SET_DEFAULT_STATE
    }
}
// get data about my accaunt
export const getMyData = (myDataAcc) => {
    return {
        type: GET_MY_DATA,
        myDataAcc
    }
}

export const setNewMyData = (name,value,secondName) => {
    return {
        type: SET_NEW_MY_DATA,
        name,value,secondName
    }
}

export const setMyData = (nameSecond,valueSecond) => {
    return {
        type: SET_MY_DATA,
        nameSecond,valueSecond
    }
}