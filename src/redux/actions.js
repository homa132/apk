import {SET_ACTIVE,GET_MY_DATA,SET_DEFAULT_STATE,GET_EVENTS,
    SET_NEW_DATA,SET_NEW_IMAGES,SET_NEW_MY_DATA,SET_MY_DATA,
    SET_FILTER} from './const'

// get events
export const getEvents = (arrayEvent,lastEvent) => {
    return {
        type:GET_EVENTS,
        arrayEvent,lastEvent
    }
}   

export const setFilter = (nameFilter,valueFilter) => {
    return {
        type: SET_FILTER,
        nameFilter,valueFilter
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