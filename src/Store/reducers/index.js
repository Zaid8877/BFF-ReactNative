import {combineReducers} from 'redux';
import {userReducer} from './user';
import {onBoardingReducer} from "./onBoardingReducer";
import {RecentChannelReducer} from "./RecentChannelReducer";


export default combineReducers({
    userReducer,
    onBoardingReducer,
    RecentChannelReducer,
});

