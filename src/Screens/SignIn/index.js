import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors, Metrics } from '../../Theme'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Images from '../../Utils/Images'
import Navigator from '../../Utils/Navigator'
import { useDispatch } from 'react-redux'
import {signIn} from '../../Store/actions/user'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onPress=()=>{
    dispatch(signIn({email,password}));
  }


  return (
    <RootView style={styles.container} showCircle lightCircle rightCircle>
      <Image source={Images.logo} style={styles.image} />

      <View style={styles.inputView}>
        <Heading text='Welcome' />
        <Text style={styles.signIn}>Sign in to your account</Text>
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
        <Text style={styles.forgotPass} onPress={()=>Navigator.navigate('ForgotPassword')}>Forgot your Password?</Text>
        <Button text='Login' onPress={onPress}/>
        <Text style={styles.boldText}>Don't have an account? <Text onPress={()=>Navigator.navigate('SignUp')} style={{ color: Colors.primary }}>Sign Up</Text></Text>
        <View style={styles.lineView}>
          <View style={styles.line} />
          <Text style={styles.or}>Or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.iconView}>
          <Image source={ Images.facebook } style={styles.icon} />
          <Image source={ Images.twitter } style={styles.icon} />
          <Image source={ Images.google } style={styles.icon} />
        </View>
      </View>
    </RootView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical:Metrics.largeMargin
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.2,
    alignSelf: 'center',
    resizeMode:'contain',
  },
  inputView: {
    padding: Metrics.largeMargin
  },
  signIn: {
    marginVertical: Metrics.smallMargin,
    fontSize: 16
  },
  forgotPass: {
    textAlign: 'right',
    fontSize: 12,
    marginBottom: Metrics.defaultMargin
  },
  boldText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  lineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrics.defaultMargin
  },
  line: {
    height: 2,
    backgroundColor: Colors.lightGrey,
    flex: 1,
  },
  or: {
    color: Colors.grey,
    marginHorizontal: 10
  },
  iconView: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  icon: {
    width: 45,
    height: 45,
    marginHorizontal: Metrics.smallMargin
  }
})