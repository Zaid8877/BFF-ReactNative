import {SIGN_IN,SIGN_UP,SIGN_OUT} from '../types/user';

export const userReducer = (state = null, action) => {
    switch(action.type) {
        case SIGN_IN:
            return action.payload;
        case SIGN_OUT:
            return null;

        default:
            return state
        }
}