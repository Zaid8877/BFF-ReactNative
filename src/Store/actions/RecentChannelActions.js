import {RecentChannelKey} from '../types/RecentChannelTypes';

export const setRecentChannel = payload=>dispatch=>{
    dispatch({
        type:RecentChannelKey,
        payload
    })
}
