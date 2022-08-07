import {View, Text, StyleSheet, Keyboard} from 'react-native'
import React, {useEffect} from 'react'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import { Colors, Metrics } from '../../Theme'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { useState } from 'react'
import OTPInputView from 'react-native-otp-textinput'
import Navigator from '../../Utils/Navigator'
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS, isEmailValid, isFieldEmpty, isPasswordValid} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";

const Verification = ({route})=> {
  const {email} = route.params
  const [code, setCode] = useState('');
  const [isCodeEntered, setIsCodeEntered] = useState(false);

  const {
    onCallApi: onCallVerifyOTPApi,
    loading: verifyOTPLoading,
  } = useApiWrapper({
    type: REQUEST_METHOD.POST,
    endPoint: ApiService.auth.verifyOTP,
  });


  useEffect(() => {
    validateFields()
  }, [code])


  const validateFields = () => {
    if (!isFieldEmpty(code) && code.length === 4) {
      setIsCodeEntered(false)
      verifyOTP()
    }
    else {
      setIsCodeEntered(true)
    }
  }
  const verifyOTP = async () => {
    Keyboard.dismiss();
    const params = {
      email: email.trim().toLowerCase(),
      otp:code
    };
    const verifyOTPResponse = await onCallVerifyOTPApi(params);
    const {ok = false, status, data = {}} = verifyOTPResponse || {};
    if (ok && API_STATUS.SUCCESS.includes(String(status))) {
      if(data.error){
        showToast(data.message)
      }
      else{
        Navigator.navigate('ChangePassword',{email:email})
      }
    } else {
      const {message = ''} = data || {};
      showToast(message)
    }
  }

  return (
    <RootView style={styles.container} isLoading={verifyOTPLoading}>
      <Heading text="Verification" />
      <Text style={styles.text}>We have just sent your email an OTP, please enter below to verify.</Text>
      <OTPInputView
        defaultValue={code}
        handleTextChange={code => setCode(code)}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        tintColor={Colors.primary}
      />
      <Text style={styles.smallText}>Resend in 00:30</Text>
      <Button disabled={isCodeEntered} text='Send' onPress={()=>verifyOTP()}/>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Metrics.largeMargin,
    paddingTop: Metrics.screenHeight * 0.1
  },
  text: {
    fontSize: 16,
    marginVertical: Metrics.defaultMargin
  },
  smallText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40
  },
  textInputContainer:{
    width: '90%',
    alignSelf:'center',
    marginVertical:Metrics.largeMargin

  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor:Colors.primary,
    borderBottomWidth:2,
    fontSize:16
  },
})
export default Verification;
