import {GET_DATA,SET_NAVIGATOR} from '../const';

const initState = {
    data : [],
}

export default (state = initState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {...state,data:action.newData}
        case SET_NAVIGATOR:
            return {...state,navigator:action.navigator}
        
        default: return state
    }
}