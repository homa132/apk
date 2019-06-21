import {GET_DATA,NAVIGATE_TO,FILTER_LIST,SET_ACTIVE_ITEM,SET_CORDINATE,
    ADD_IMAGES,CHANGE_CATEGORY,CHANGE_DATE,CAHNGE_TIME,
    SET_TEXT_DATE} from './const'

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

// create new

export const addImage = (image) => {
    return {
        type:ADD_IMAGES,
        image
    }
}

export const changeCategory = (category) => {
    return {
        type:CHANGE_CATEGORY,
        category
    }
}

export const changeDate = (date) => {
    return {
        type: CHANGE_DATE,
        date
    }
}

export const changeTime = (time) => {
    return {
        type: CAHNGE_TIME,
        time
    }
}

export const setTextDate = (what,value) => {
    return {
        type:SET_TEXT_DATE,
        what,value
    }
}

export const setCordinate = (cordinate) => {
    return {
        type:SET_CORDINATE,
        cordinate
    }
}