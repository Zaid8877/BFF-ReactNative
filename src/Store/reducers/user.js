import {SIGN_IN,SIGN_UP,SIGN_OUT} from '../types/user';
import AsyncStorage from "@react-native-community/async-storage";
import persistReducer from 'redux-persist/es/persistReducer';
import {logToConsole} from "../../Configs/ReactotronConfig";
import useUserState, {UserModel} from "../../CustomHooks/useUserState";

const initialState= {
    userInfo:{}
}
export const userReducer = (state = initialState, action) => {
    const {type, payload} = action || {};
    // const {userReducer} = payload;
    // const {userInfo} = userReducer
    // logToConsole({userReducer: userInfo})
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                userInfo: payload,
            };
        case SIGN_OUT:
            return null;

        default:
            return state
        }
}

