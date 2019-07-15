import {FILTER_LIST,SET_ACTIVE_ITEM,GET_MY_DATA,SET_DEFAULT_STATE,
    SET_NEW_DATA,SET_NEW_IMAGES,SET_ALL_LIST_EVENTS} from './const'

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