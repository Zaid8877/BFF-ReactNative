import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import { Metrics } from '../../Theme'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { useState } from 'react'
import Navigator from '../../Utils/Navigator'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <RootView style={styles.container}>
      <Heading text="Forgot Password" />
      <Text style={styles.text}>Please type your email or phone number below</Text>
      <Input
        value={email}
        onChangeText={(val) => setEmail(val)}
        placeholder='Email or Phone Number'
        keyboardType='email-address'
      />
      <Button text='Send' onPress={()=>Navigator.navigate('Verification')} />
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
  }
})