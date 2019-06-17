import {GET_DATA,NAVIGATE_TO,FILTER_LIST,SET_ACTIVE_ITEM} from './const'

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

//active item
export const setActiveItem = (heshItem) => {
    return {
        type: SET_ACTIVE_ITEM,
        heshItem
    }
}