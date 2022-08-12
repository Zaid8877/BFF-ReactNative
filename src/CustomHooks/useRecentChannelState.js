import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {userReducer} from "../Store/reducers/user";
import {logToConsole} from "../Configs/ReactotronConfig";
const useRecentChannelState = () => {
  const {RecentChannelReducer} = useSelector(
      ({RecentChannelReducer}) => ({
        RecentChannelReducer
      }),
  );
  logToConsole({RecentChannelReducer})
  const recentChannels = (RecentChannelReducer!=null)?RecentChannelReducer.RecentChannels:[]
  return useMemo(() => {
    return recentChannels || []
  })
};
export default useRecentChannelState;
