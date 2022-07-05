import {SIGN_IN,SIGN_UP,SIGN_OUT} from '../types/user';

export const signIn = (payload)=>{
    return {
        type:SIGN_IN,
        payload:payload
    }
}

export const signOut = ()=>{
    return {
        type:SIGN_OUT,
    }
}