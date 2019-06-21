import {combineReducers} from 'redux';
import Data from './data';
import Navigation from './navigation';
import New from './new';

export default combineReducers({
    data: Data,
    navigation: Navigation,
    new: New
})