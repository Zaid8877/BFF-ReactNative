import {RecentChannelKey} from '../types/RecentChannelTypes';
import {logToConsole} from "../../Configs/ReactotronConfig";

const initialState={
    RecentChannels:[]
}
export const RecentChannelReducer = (state = initialState, action) => {
    const {type, payload} = action || {};
    logToConsole({payload})
    switch(type) {
        case RecentChannelKey:
            return {
                ...state,
                RecentChannels: payload,
            };
        default:
            return state
    }
}

