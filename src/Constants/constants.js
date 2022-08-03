import {Platform} from 'react-native';
import {APP_STRINGS} from './strings';
import {logToConsole} from "../Configs/ReactotronConfig";

//Platforms
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const API_STATUS = {
  UNAUTHORIZED: ['401'],
  INTERNAL_SERVER_ERROR: ['500', '501', '503'],
  NOT_FOUND: ['404'],
  SUCCESS: ['200', '201'],
  INTERNET_TIMEOUT: ['0'],
};

export const isEmailValid=(email)=>{
  return EMAIL_REGEX.test(email)
}
export const isFieldEmpty=(field)=>{
  return !(field && field.length >0)
}
export const isPasswordValid=(field)=>{
  return (field && field.length >5)
}
export const isNameFieldValid=(field)=>{
  return (field && field.length >3)
}
