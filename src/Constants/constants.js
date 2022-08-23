import {Platform} from 'react-native';
import {APP_STRINGS} from './strings';

//Platforms
export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
// export const agoraAppId = 'ded6b8286e3f4641a901f96e5c685f65';
// export const agoraAppCertificate='bcadf1de8eca498e9062e2d416d1e699'
// export const agoraAppToken='006ded6b8286e3f4641a901f96e5c685f65IAA0qt7iH9NVdujhAPvR5eGpNiXLmYCiKTxCB5peL8Hk7Ya0dcYAAAAAEADYBo2ZW2L9YgEAAQBaYv1i'

export const agoraAppId = '5c5c566c59bd407ca8c735b21da82e90';
export const agoraAppCertificate='d50c92dbf627457db620af01344beb70'
export const agoraAppToken='007eJxTYIgSW31dMtBse67ix6TpFpvOKttrMpcFCWcLXui6fXzyQQEFBtNkIDQzSza1TEoxMTBPTrRINjc2TTIyTEm0MEq1NDBiYkjeGMyYvKoxk5mRAQJBfC6G3Erd5IzEvLzUHAYGAFU/H7k='

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
