import {GET_DATA,NAVIGATE_TO} from './const'

export const getData = (newData) => {
    return {
        type:GET_DATA,
        newData
    }
}


export const navigateTo = (screen) => {
    return {
        type: NAVIGATE_TO,
        screen
    }
}