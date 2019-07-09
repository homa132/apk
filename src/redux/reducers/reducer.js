import {combineReducers} from 'redux';
import Data from './data';
import New from './new';
import Navigation from './navigation';


export default combineReducers({
    data: Data,
    new: New,
    navigation: Navigation
})