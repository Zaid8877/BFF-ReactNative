import {OnBoardingStatus} from '../types/onBoarding';
import AsyncStorage from "@react-native-community/async-storage";
import persistReducer from 'redux-persist/es/persistReducer';
import {logToConsole} from "../../Configs/ReactotronConfig";

const initialState={
    isOnBoadring:false
}
export const onBoardingReducer = (state = initialState, action) => {
    const {type, payload} = action || {};
    logToConsole({payload})
    switch(type) {
        case OnBoardingStatus:
            return {
                ...state,
                isOnBoadring: payload,
            };
        default:
            return state
    }
}

