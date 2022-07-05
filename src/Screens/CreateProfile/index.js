import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Images from '../../Utils/Images'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { Metrics } from '../../Theme'
import { useDispatch } from 'react-redux'
import { signIn } from '../../Store/actions/user'

export default function CreateProfile() {
  const dispatch = useDispatch()

  return (
    <RootView lightCircle showCircle>
      <Header title='Profile' showRight/>
      <View style={styles.container}>
        <Image source={Images.person} style={styles.image}/>
        <Input placeholder='Display Name'/>
        <Input placeholder='Phone Number'/>
        <Text style={styles.text}>Provide your name and number so your friends can find you.</Text>
        <Button text='Done' onPress={()=>dispatch(signIn({email:'abc@gmail.com'}))} />
      </View>
    </RootView>
  )
}


const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    padding:Metrics.largeMargin

  },
  image:{
    width: Metrics.screenWidth*0.3,
    height: Metrics.screenWidth*0.3,
    borderRadius: Metrics.screenWidth*0.15,
    alignSelf:'center',
    marginBottom:Metrics.largeMargin
  },
  text:{
    fontSize:16,
    marginBottom:Metrics.largeMargin
  }
})