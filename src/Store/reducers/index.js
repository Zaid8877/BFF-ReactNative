import {combineReducers} from 'redux';
import {userReducer} from './user';
import {onBoardingReducer} from "./onBoardingReducer";


export default combineReducers({
    userReducer,
    onBoardingReducer
});

