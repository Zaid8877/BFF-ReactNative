import useApiService from './useApiService';
import {Alert} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {displayToConsole} from '../Configs/ReactotronConfig';
import {API_STATUS, APP_STRINGS} from '../Constants';
import Config from "react-native-config";

export const REQUEST_METHOD = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};

export let isApiErrorModal = false;

export const useApiWrapper = ({
  type = REQUEST_METHOD.GET,
  endPoint = '',
  headers = {},
  withError = true,
  baseUrl = "https://bff.appnoit.com",
}) => {
  const {
    response,
    loading,
    [type]: method,
    error,
    abort,
  } = useApiService({headers, baseUrl});

  const [errorMessage, setErrorMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  useEffect(() => {
    return () => {
      isApiErrorModal = false;
    };
  }, []);

  const getQueryParams = (params = {}) => {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach(val => queryParams.append([key], val));
      } else {
        queryParams.append([key], value);
      }
    }
    return queryParams.toString();
  };

  const onCallApi = useCallback(
    async (params = {}, append = '') => {
      setErrorMessage('');
      setErrorTitle('');
      try {
        let endPointWithParams = endPoint + append;
        if (type === REQUEST_METHOD.GET) {
          if (Object.keys(params).length) {
            const queryParams = getQueryParams(params);
            endPointWithParams = `${endPoint}?${queryParams}`;
          }
          params = undefined;
        }
        await method(endPointWithParams, params);
        // displayToConsole(
        //   {
        //     response,
        //     endPoint: endPointWithParams,
        //     params,
        //     type,
        //   },
        //   'ON_CALL_API',
        // );
        if (
          !API_STATUS.SUCCESS.includes(String(response.status) || !response.ok)
        ) {
          throw response;
        }
        return response;
      } catch (err) {
        return handleApiError(response?.status || 0, err);
      }
    },
    [endPoint],
  );

  const handleApiError = (status, err) => {
    displayToConsole({...err, status}, 'ON_CALL_API_ERROR');
    let [message, title] = ['', ''];
    isApiErrorModal = false;
    if (API_STATUS.INTERNET_TIMEOUT.includes(status)) {
      isApiErrorModal = true;
      title = APP_STRINGS.APP_NAME;
      message = 'Please check your internet connection and try again';
    } else if (API_STATUS.INTERNAL_SERVER_ERROR.includes(status)) {
      isApiErrorModal = true;
      title = APP_STRINGS.APP_NAME;
      message = APP_STRINGS.OOPS_ERROR;
    }
    setErrorTitle(title);
    setErrorMessage(message);
    return {
      ...(err || {}),
      isError: true,
      isErrorDisplayed: isApiErrorModal && withError,
      title,
      message,
    };
  };

  const renderErrorModalJSX = useMemo(() => {
    if (errorMessage && withError) {
      return Alert.alert(errorTitle, errorMessage);
    }
    return null;
  }, [errorMessage, errorTitle, withError]);

  return {
    renderErrorModalJSX,
    loading,
    onCallApi,
    abort,
    getQueryParams,
  };
};
