import {TEST} from '../const';

const initState = {
    data : []
}

export default (state = initState, action) => {
    switch (action.type) {
        case TEST:
            console.log(action.newData);
            return state

        
        default: return state
    }
}