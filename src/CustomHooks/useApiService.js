import React from 'react';
import useFetch from 'use-http';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';
import useUserState from "./useUserState";
import {logToConsole} from "../Configs/ReactotronConfig";

const useApiService = ({
  options = {},
  headers = {},
  baseUrl = 'https://bff.appnoit.com',
} = {}) => {
  const token = useUserState().token;

  options = {
    cachePolicy: 'no-cache',
    retries: 2,
    retryDelay: 10000,
    retryOn: ({response}) => response?.status >= 500,
    timeout: 30000,
    headers: {
      Authorization: token?`${token}`:'',
      ...headers,
    },
    ...options,
  };

  return useFetch(baseUrl, options);
};

export default useApiService;
