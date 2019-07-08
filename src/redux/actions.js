import {GET_DATA,NAVIGATE_TO,FILTER_LIST,SET_ACTIVE_ITEM,SET_NAVIGATION,
    SET_NEW_DATA,SET_NEW_IMAGES} from './const'

export const getData = (newData) => {
    return {
        type:GET_DATA,
        newData
    }
}

export const filterList = (date,category) => {
    return {
        type: FILTER_LIST,
        date,category
    }
}

// naviation
export const navigateTo = (screen) => {
    return {
        type: NAVIGATE_TO,
        screen
    }
}

export const setNavigation = (navigation) => {
    return {
        type: SET_NAVIGATION,
        navigation
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