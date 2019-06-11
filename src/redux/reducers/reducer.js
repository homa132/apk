import {combineReducers} from 'redux';
import Data from './data';
import Navigation from './navigation';


export default combineReducers({
    data: Data,
    navigation: Navigation
})