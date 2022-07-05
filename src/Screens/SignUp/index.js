import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import { Metrics } from '../../Theme'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { useState } from 'react'
import Navigator from '../../Utils/Navigator'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <RootView style={styles.container}>
      <Heading text="Sign Up" />
      <Text style={styles.text}>Please type your information below</Text>
      <Input
        value={name}
        onChangeText={(val) => setName(val)}
        placeholder='Full Name'
      />
      <Input
        value={email}
        onChangeText={(val) => setEmail(val)}
        placeholder='Email'
        keyboardType='email-address'
        icon='email-outline'
      />
      <Input
        value={password}
        onChangeText={(val) => setPassword(val)}
        placeholder='Password'
        secureTextEntry
        icon='lock-outline'
      />
      <Button text='Sign Up' onPress={()=>Navigator.navigate('CreateProfile')}/>
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