import {GET_DATA,NAVIGATE_TO,FILTER_LIST} from './const'

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