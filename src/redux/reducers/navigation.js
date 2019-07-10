import {SET_ACTIVE_ITEM} from '../const';

const initState = {
    heshItem: '',
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_ACTIVE_ITEM:
            return {...state,heshItem: action.heshItem}
        default: return state
    }
}
