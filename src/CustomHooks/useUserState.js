import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {userReducer} from "../Store/reducers/user";
import {logToConsole} from "../Configs/ReactotronConfig";
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
    } = userInfo || {};
    return {
      id,
      token,
      message,
      message_key,
      error,
      name,
      email,
      cell_no,
      user_name,
      password,
      is_Active,
      created_on,
      updated_on,
    };
  }, [userInfo]);
};
export default useUserState;
