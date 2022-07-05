import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import { Colors, Metrics } from '../../Theme'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { useState } from 'react'
import OTPInputView from 'react-native-otp-textinput'
import Navigator from '../../Utils/Navigator'

export default function Verification() {
  const [code, setCode] = useState('');

  return (
    <RootView style={styles.container}>
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
      <Button text='Send' onPress={()=>Navigator.navigate('SignIn')}/>
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