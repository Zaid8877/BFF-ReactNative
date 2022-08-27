/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Keyboard, ActivityIndicator} from 'react-native';
import { Colors, Metrics } from '../../Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Navigator from '../../Utils/Navigator';
import { useDispatch } from 'react-redux';
import { signOut } from '../../Store/actions/user';
import useUserState from "../../CustomHooks/useUserState";
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS, isIos} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";
import FullWrapperLoader from "../ImageComponentLoader/FullWrapperLoader";
import colors from "../../Theme/Colors";
import ImageComponentLoader from "../ImageComponentLoader";

const { screenWidth } = Metrics;

const screens = [
  {
    name: 'Home',
    icon: 'home',
    IconComponent: FontAwesome
  },
  // {
  //   name: 'Accounts',
  //   icon: 'user',
  //   IconComponent: FontAwesome
  //
  // },
  // {
  //   name: 'Status',
  //   icon: 'checkcircle',
  //   IconComponent: AntDesign
  // },
  // {
  //   name: 'Recents',
  //   icon: 'clockcircle',
  //   IconComponent: AntDesign
  // },
  {
    name: 'Contacts',
    icon: 'user-friends',
    IconComponent: FontAwesome5
  },
  {
    name: 'Channels',
    icon: 'group',
    IconComponent: FontAwesome
  },
  // {
  //   name: 'Options',
  //   icon: 'gear',
  //   IconComponent: FontAwesome
  // }
]

const CustomDrawerItem = ({ item, focused, showLoader }) => {
  const { name, icon, IconComponent, onPress } = item;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress ? onPress() : Navigator.navigate(name)}>
      <View style={[styles.drawerItem, { backgroundColor: focused ? Colors.primary : 'white' }]}>
        <IconComponent name={icon} color={focused ? 'white' : Colors.primary} size={24} />
        <View style={[styles.textView, { borderBottomWidth: focused ? 0 : 2 }]}>
          <Text style={[styles.drawerText, { color: focused ? 'white' : Colors.grey }]}>{name}</Text>
          {name == 'Status' ? <Text style={{ color: 'green', fontWeight: 'bold' }}>Available</Text> : null}
        </View>
        {showLoader && <ActivityIndicator size={'small'} color={colors.primary} style={{marginRight:10}}/>}
      </View>
    </TouchableOpacity>
  )
}

export default function CustomDrawer(props) {
  const { index } = props.state;
  const dispatch = useDispatch()
  const userInfo=useUserState()
  const name= userInfo? userInfo.name:''
  const user_name= userInfo? userInfo.user_name:''
  const firstLetter= (userInfo && userInfo.name)? userInfo.name.charAt(0).toUpperCase():''
  const image= (userInfo && userInfo.profile_pic)? userInfo.profile_pic:undefined
  const {
    onCallApi: onCallLogoutApi,
    loading: onLoadingLogout,
  } = useApiWrapper({
    type: REQUEST_METHOD.POST,
    endPoint: ApiService.auth.logout
  });

  const onLogout = async () => {
    Keyboard.dismiss();

    const loginResponse = await onCallLogoutApi();
    const {ok = false, status, data = {}} = loginResponse || {};
    if (ok && API_STATUS.SUCCESS.includes(String(status))) {
      if (data.error) {
        showToast(data.message)
      } else {
        dispatch(signOut())
      }
    } else {
      const {message = ''} = data || {};
      showToast(message)
    }
  }
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingTop: 60
    }}>
      <View style={{ width: '80%' }}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => Navigator.navigate('Profile')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '3%',
              paddingBottom: '6%'
            }}>
            <View
              style={{
                width: screenWidth * 0.2,
                height: screenWidth * 0.2,
                backgroundColor: Colors.primary,
                borderRadius: 100,
                justifyContent: 'center'
              }}
            >
              {image && <ImageComponentLoader source={image} containerStyle={{ width: screenWidth * 0.2,
                height: screenWidth * 0.2,
                backgroundColor: Colors.primary,
                borderRadius: 100,
                justifyContent: 'center'}} />}
              {!image && <Text style={{ textAlign: 'center', color: Colors.light, fontSize: 36, fontWeight: 'bold' }}>{firstLetter}</Text>}
            </View>
            <View style={{ marginLeft: 20, flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 5, color: Colors.textDark }}>
                {name}
              </Text>
              <Text style={{ fontSize: 16, color: Colors.grey }}>{user_name}</Text>
            </View>

          </View>
        </TouchableOpacity>
        <ScrollView bounces={false} style={{ marginBottom: screenWidth * 0.4, overflow: 'visible' }} showsVerticalScrollIndicator={false}>
          {screens.map((item, i) => <CustomDrawerItem item={item} focused={index === i} />)}

          <CustomDrawerItem item={{
            name: 'Log Out',
            icon: 'power-off',
            IconComponent: FontAwesome,
            onPress: () => {onLogout().then()}
          }} showLoader={onLoadingLogout} />

        </ScrollView>
      </View>

      <View
        style={{
          width: '16%',
          alignItems: 'flex-end',
          marginRight: 20,
        }}>
        <Icon name="menu" color={Colors.primary} size={36} onPress={() => Navigator.closeDrawer()} />
      </View>
      <View style={styles.bottomView} />


    </View>
  );
}

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical:Metrics.smallMargin,
    alignItems: 'center',
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,


  },
  textView: {
    flex: 1, height: '100%', paddingVertical: Metrics.smallMargin, borderColor: Colors.lightGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  drawerText: {
    fontWeight: 'bold', fontSize: 16, color: Colors.grey, marginLeft: 10,

  },
  bottomView: {
    position: 'absolute',
    bottom: -screenWidth * 0.6,
    left: -screenWidth * 0.4,
    width: screenWidth,
    height: screenWidth,
    backgroundColor: Colors.primary,
    borderRadius: screenWidth,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 24.00,
    elevation: 24,
  }
})

