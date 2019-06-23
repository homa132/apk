import {NAVIGATE_TO,SET_ACTIVE_ITEM,SET_NAVIGATION} from '../const';

const initState = {
    activeScreen: 'MainFirst',
    heshItem: '',
    navigation: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case NAVIGATE_TO:
            return {...state,activeScreen:action.screen}
        case SET_ACTIVE_ITEM:
            return {...state,heshItem: action.heshItem}
        case SET_NAVIGATION: 
            return {...state,navigation:action.navigation}
        default: return state
    }
}
