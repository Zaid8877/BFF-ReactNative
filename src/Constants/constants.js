import {Platform} from 'react-native';
import {APP_STRINGS} from './strings';
import {logToConsole} from "../Configs/ReactotronConfig";

//Platforms
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const agoraAppId = 'ded6b8286e3f4641a901f96e5c685f65';
export const agoraAppCertificate='bcadf1de8eca498e9062e2d416d1e699'
export const agoraAppToken='006ded6b8286e3f4641a901f96e5c685f65IAC6zG2OVKI/LIiNFDEZ8gO6P4aS0qYmF0ENSHIseQyZTIa0dcYAAAAAEABiLYCE1jf6YgEAAQDVN/pi'

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
export const isConfirmPasswordCorrect=(password, confirmPassword)=>{
  return (password === confirmPassword)
}
export const isNameFieldValid=(field)=>{
  return (field && field.length >3)
}
