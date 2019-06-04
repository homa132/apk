import {GET_DATA} from '../const';

const initState = {
    data : []
}

export default (state = initState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {...state,data:action.newData}

        
        default: return state
    }
}