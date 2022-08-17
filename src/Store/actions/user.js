import {SIGN_IN,SIGN_UP,SIGN_OUT} from '../types/user';
import {setClearRecentChannel, setRecentChannel} from "./RecentChannelActions";

export const signIn = payload=>dispatch=>{
    dispatch({
        type:SIGN_IN,
        payload
    })
}

export const signOut = ()=>dispatch=>{
    dispatch(setClearRecentChannel())
    setTimeout(()=>{
        dispatch({
            type:SIGN_OUT,
        })
    },400)


}
