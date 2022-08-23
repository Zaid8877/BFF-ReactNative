import {SIGN_IN,SIGN_UP,SIGN_OUT} from '../types/user';

const initialState= {
    userInfo:{}
}
export const userReducer = (state = initialState, action) => {
    const {type, payload} = action || {};
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

