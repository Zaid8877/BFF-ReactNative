import React from 'react';
import useFetch from 'use-http';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';

const useApiService = ({
  options = {},
  headers = {},
  baseUrl = 'https://bff.appnoit.com',
} = {}) => {
  const {authToken = ''} = useSelector(({auth: {authToken = ''} = {}}) => ({
    authToken,
  }));

  options = {
    cachePolicy: 'no-cache',
    retries: 2,
    retryDelay: 10000,
    retryOn: ({response}) => response?.status >= 500,
    timeout: 30000,
    headers: {
      Authorization: authToken?`${authToken}`:'',
      ...headers,
    },
    ...options,
  };

  return useFetch(baseUrl, options);
};

export default useApiService;
