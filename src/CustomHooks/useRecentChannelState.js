import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {userReducer} from "../Store/reducers/user";
const useRecentChannelState = () => {
  const {RecentChannelReducer} = useSelector(
      ({RecentChannelReducer}) => ({
        RecentChannelReducer
      }),
  );
  const recentChannels = (RecentChannelReducer!=null)?RecentChannelReducer.RecentChannels:[]
  return useMemo(() => {
    return recentChannels || []
  })
};
export default useRecentChannelState;
