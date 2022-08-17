import {RecentChannelKey, ClearRecentChannel} from '../types/RecentChannelTypes';

export const setRecentChannel = payload => dispatch => {
    dispatch({
        type: RecentChannelKey,
        payload
    })
}
export const setClearRecentChannel = () => dispatch => {
    dispatch({
        type: ClearRecentChannel
    })
}
