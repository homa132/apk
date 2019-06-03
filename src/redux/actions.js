import {TEST} from './const'

export const test = (newData) => {
    return {
        type:TEST,
        newData
    }
}