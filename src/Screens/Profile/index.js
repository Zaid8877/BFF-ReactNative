import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity, TextInput,
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
import ImageComponentLoader from "../../Components/ImageComponentLoader";
import colors from "../../Theme/Colors";
import usePhotoModal from "../../Components/usePhotoModal";
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import useRefEffect from "react-native/Libraries/Utilities/useRefEffect";
import {logToConsole} from "../../Configs/ReactotronConfig";
import {showToast} from "../../Utils/ToastUtils";
import {signIn} from "../../Store/actions/user";
import {useDispatch} from 'react-redux'
import Button from "../../Components/Button";
import {API_STATUS} from "../../Constants";

export default function Profile() {
  const dispatch = useDispatch()
  const userInfo=useUserState()
  const [isPhotoModal, setIsPhotoModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [imageBaseUrl, setImageBaseUrl] = useState('');
  const [image,setImage] = useState('')

  const getInitialState=(user)=> {
    return {
      name: user ? user.name : '',
      user_name: user ? user.user_name : '',
      cell_no: user ? user.cell_no : '',
      email: user ? user.email : '',
      image: user?user.profile_pic:''
    }
  }

  const [state, setState] = useState(getInitialState(userInfo))

  const {renderPhotoModalJSX, isUploadingPhoto} =
      usePhotoModal({
        closeModal: setIsPhotoModal,
        isVisible: isPhotoModal,
        image,
        onSetPhoto: setImage,
        onSetBaseUrl: setImageBaseUrl,
        modalHeading: "Update Profile Picture",
        options: {
          cropperCircleOverlay: false,
          cropping: true,
          width: Metrics.screenWidth * 5,
          height: Metrics.screenWidth * 5,
        },
      });

  const renderItem = (text, onPress = () => {}, icon = 'pencil-outline') => {
    return  (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={styles.item}>
          <Text style={styles.text}>{text}</Text>
          <Icon name={icon} size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  const {
    onCallApi: onCallUpdateProfileAPI,
    loading: updateProfileLoading,
  } = useApiWrapper({
    type: REQUEST_METHOD.POST,
    endPoint: ApiService.user.updateUserProfile
  });

  const updateProfile = async () => {
    const params = new FormData()
    params.append("user_name",state.user_name)
    params.append("name",state.name)
      if(image)
        params.append("profile_pic",image)
    const loginResponse = await onCallUpdateProfileAPI(params);
    const {ok = false, status, data = {}} = loginResponse || {};
    setIsEditable(false)
    if (ok && API_STATUS.SUCCESS.includes(String(status))) {
      if(data.error){
        showToast(data.message.error)
      }
      else{
        dispatch(signIn({...userInfo,user_name:data.data.user_name,name:data.data.name, profile_pic:data.data.profile_pic }))
      }
    } else {
      const {message = ''} = data || {};
      showToast(message)
    }
  }
  return (
    <RootView isLoading={updateProfileLoading}>
      <Header title={userInfo.name}  />
      <ScrollView style={{flex: 1}}>
        <View>
          <ImageComponentLoader source={image? image:state.image} inOnline={!image} containerStyle={styles.image} />
            {isEditable &&
                <TouchableOpacity style={styles.iconView} onPress={() => {
                    setIsPhotoModal(true)
                }}>
                    <Icon name={"upload"}
                          color="white"/>
                </TouchableOpacity>
            }
        </View>
        <View
          multiline
          style={{
            marginTop: Metrics.defaultMargin,
          }}/>

        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Name</Text>

          <TextInput editable={isEditable} style={styles.text} placeholder={"Name"} onChangeText={(value)=>{
            setState({...state, name:value})
          }}>{state.name}</TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Display Name</Text>

          <TextInput editable={isEditable} style={styles.text} placeholder={"Display Name"} onChangeText={(value)=>{
            setState({...state, user_name:value})

          }}>{state.user_name}</TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Phone Number</Text>

          <TextInput editable={false} style={styles.text} placeholder={"Phone Number"}>{state.cell_no}</TextInput>
        </View>
        <View style={styles.item}>
          <Text style={styles.headingTextInput}>Email</Text>
          <TextInput editable={false} style={styles.text} placeholder={"Email"}>{state.email}</TextInput>
        </View>
        {/*{renderItem('Name')}*/}
        {/*{renderItem('Location')}*/}
        {/*{renderItem('Website')}*/}
        {/*{renderItem(*/}
        {/*  'Language',*/}
        {/*  () => Navigator.navigate('Languages'),*/}
        {/*  'chevron-right',*/}
        {/*)}*/}
      </ScrollView>
      <Button text={isEditable?'Update':"Edit"} style={{marginHorizontal: Metrics.defaultMargin}} onPress={()=>{
        if(isEditable){
          updateProfile().then(0)
        }
        else{
          setIsEditable(true)
        }
      }} />
      {renderPhotoModalJSX()}

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

  iconView: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderColor: 'white',
    borderWidth: 1,
    zIndex: 10,
  },
});
