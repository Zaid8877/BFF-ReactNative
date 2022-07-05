import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from 'react-redux';
import HomeStack from "./HomeStack";
import Navigator from "../Utils/Navigator"
import AuthStack from './AuthStack'
import { ActivityIndicator,View } from "react-native";
import { Colors } from "../Theme";
import BottomTab from "./BottomTab";


const AuthLoading = ({ userReducer }) => {

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (userReducer) {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false);
    }
    setLoading(false)
  }, [userReducer])

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
        {loggedIn ? <HomeStack/> : <AuthStack />}
      </NavigationContainer>
    );
  }


};

const mapStateToProps = state => {
  const { userReducer } = state;
  return { userReducer };
};

export default connect(mapStateToProps)(AuthLoading);