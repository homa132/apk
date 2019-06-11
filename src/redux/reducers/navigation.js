import {NAVIGATE_TO} from '../const';

const initState = {
    activeScreen: 'MainFirst'
}

export default (state = initState, action) => {
    switch (action.type) {
        case NAVIGATE_TO:
            return {...state,activeScreen:action.screen}


        default: return state
    }
}
