import {NAVIGATE_TO,SET_ACTIVE_ITEM} from '../const';

const initState = {
    activeScreen: 'MainFirst',
    heshItem: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case NAVIGATE_TO:
            return {...state,activeScreen:action.screen}
        case SET_ACTIVE_ITEM:
            return {...state,heshItem: action.heshItem}

        default: return state
    }
}
