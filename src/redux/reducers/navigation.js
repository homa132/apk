import {SET_ACTIVE} from '../const';

const initState = {
    heshItem: '',
    hestUser: '',
    arrayFriends: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_ACTIVE:
            return {...state,[action.name]: action.heshItem}
        default: return state
    }
}
