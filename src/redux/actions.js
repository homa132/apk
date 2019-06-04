import {GET_DATA} from './const'

export const getData = (newData) => {
    return {
        type:GET_DATA,
        newData
    }
}