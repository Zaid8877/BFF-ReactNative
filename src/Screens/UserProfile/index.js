import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity, TextInput, Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Images from '../../Utils/Images';
import {Colors, Metrics} from '../../Theme';
import Input from '../../Components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import useUserState from "../../CustomHooks/useUserState";
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS} from "../../Constants";
import {signIn} from "../../Store/actions/user";
import {showToast} from "../../Utils/ToastUtils";
import {logToConsole} from "../../Configs/ReactotronConfig";
import ImageComponent from "../../Components/ImageComponent";
import ImageComponentLoader from "../../Components/ImageComponentLoader";

const UserProfile=({route})=> {
    logToConsole(route.params)
  const {userId} = route.params
  const getInitialState=()=> {
    return {
      profile_pic:'',
      name: '',
      user_name:'',
      cell_no: '',
      email: ''
    }
  }
  const [state, setState] = useState(getInitialState())
  const [isApiLoaded, setIsApiLoaded] = useState(false)

  useEffect(()=>{
    OnGetFetchUserProfile()
  },[])
  const {
    onCallApi: onFetchingUserProfileApi,
    loading: isFetchingProfile,
  } = useApiWrapper({
    type: REQUEST_METHOD.GET,
    endPoint: ApiService.user.getUserById,
  });


  const OnGetFetchUserProfile = async () => {
    Keyboard.dismiss();

    const loginResponse = await onFetchingUserProfileApi({},"/"+userId);
    const {ok = false, status, data = {}} = loginResponse || {};
    if (ok && API_STATUS.SUCCESS.includes(String(status))) {
      setState(data)
        setIsApiLoaded(true)
    } else {
      const {message = ''} = data || {};
      showToast(message)
    }
  };

  return (
    <RootView isLoading={isFetchingProfile}>
      <Header secondary title={state.name}  showAddIcon={true} addIconName={'phone'} onPressRight={()=>{
        Navigator.navigate("CallScreen",{contact:state})
      }} leftIcon='chevron-left'
              onPressLeft={() => Navigator.goBack()}/>
      {isApiLoaded &&
          <ScrollView style={{flex: 1}}>

            <ImageComponentLoader source={{uri: state.profile_pic}} containerStyle={styles.image}/>
            <View
                multiline
                style={{
                  marginTop: Metrics.defaultMargin,
                }}/>

            <View style={styles.item}>
              <Text style={styles.headingTextInput}>Name</Text>

              <TextInput editable={false} style={styles.text} placeholder={"Name"}>{state.name}</TextInput>
            </View>
            <View style={styles.item}>
              <Text style={styles.headingTextInput}>Display Name</Text>

              <TextInput editable={false} style={styles.text} placeholder={"Display Name"}>{state.user_name}</TextInput>
            </View>
            <View style={styles.item}>
              <Text style={styles.headingTextInput}>Phone Number</Text>

              <TextInput editable={false} style={styles.text} placeholder={"Phone Number"}>{state.cell_no}</TextInput>
            </View>
            <View style={styles.item}>
              <Text style={styles.headingTextInput}>Email</Text>
              <TextInput editable={false} style={styles.text} placeholder={"Email"}>{state.email}</TextInput>
            </View>
          </ScrollView>
      }
    </RootView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.3,
  },
  item: {
    alignItems:'center',
    backgroundColor: Colors.lightGrey,
    marginHorizontal: Metrics.defaultMargin,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.defaultMargin,
    paddingVertical: Metrics.smallMargin,
    marginBottom: Metrics.defaultMargin,
  },
  headingTextInput:{marginRight:10, fontSize:10, backgroundColor:Colors.white, padding:2,position:'absolute',top:-5, left:5},
  text: {
    flex:1,
    fontSize: 16,
  },
});

export default UserProfile
