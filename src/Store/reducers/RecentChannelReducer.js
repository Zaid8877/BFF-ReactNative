import {RecentChannelKey,ClearRecentChannel} from '../types/RecentChannelTypes';

const initialState={
    RecentChannels:[]
}
export const RecentChannelReducer = (state = initialState, action) => {
    const {type, payload} = action || {};
    switch(type) {
        case RecentChannelKey:
            return {
                ...state,
                RecentChannels: payload,
            };
        case ClearRecentChannel:
            return []
        default:
            return state
    }
}

