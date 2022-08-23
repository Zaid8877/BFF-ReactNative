import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
const useUserState = () => {
  const {userReducer} = useSelector(
      ({userReducer}) => ({
        userReducer
      }),
  );
  const userInfo = (userReducer!=null)?userReducer.userInfo:null
  return useMemo(() => {
    const {
      id,
      token,
      message,
      message_key,
      error,
      name,
      user_name,
      email,
      cell_no,
      password,
      is_Active,
      created_on,
      updated_on,
      profile_pic,
      isSkipped,
    } = userInfo || {};
    return {
      id,
      token,
      message,
      message_key,
      profile_pic,
      error,
      name,
      email,
      cell_no,
      isSkipped,
      user_name,
      password,
      is_Active,
      created_on,
      updated_on,
    };
  }, [userInfo]);
};
export default useUserState;
