import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {connect, useSelector} from 'react-redux';
import HomeStack from "./HomeStack";
import Navigator from "../Utils/Navigator"
import AuthStack from './AuthStack'
import { ActivityIndicator,View } from "react-native";
import { Colors } from "../Theme";
import BottomTab from "./BottomTab";
import {onBoarding} from "../Store/actions/user";
import {onBoardingReducer} from "../Store/reducers/onBoardingReducer";
import {logToConsole} from "../Configs/ReactotronConfig";
import {userReducer} from "../Store/reducers/user";
import useUserState from "../CustomHooks/useUserState";


const AuthLoading = () => {
    const userInfo=useUserState()

    // const userFromState=useUserState()
  logToConsole({RootNavigation: userInfo})
  // logToConsole({RootNavigationUserFroMState: userFromState})
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    setLoading(true)
    if (userInfo && userInfo.token) {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false);
    }
    setLoading(false)
  }, [userInfo])

  if (loading) {
    return <View style={{flex:1, backgroundColor:Colors.primary,justifyContent:'center'}} >
      <ActivityIndicator color={Colors.white} size='large'/>
    </View>
  }
  else {
    return (
      <NavigationContainer
        ref={(navigatorRef) => {
          Navigator.setTopLevelNavigator(navigatorRef);
        }}>
        {loggedIn ? <HomeStack/> : <AuthStack/>}
      </NavigationContainer>
    );
  }


};

export default AuthLoading;
