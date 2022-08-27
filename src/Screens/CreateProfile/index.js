import {View, Text, Image, StyleSheet, Keyboard, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Images from '../../Utils/Images'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import {useDispatch} from 'react-redux'
import {signIn} from '../../Store/actions/user'
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import useUserState from "../../CustomHooks/useUserState";
import {API_STATUS, isEmailValid, isFieldEmpty, isNameFieldValid, isPasswordValid} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";
import Navigator from "../../Utils/Navigator";
import Metrics from "../../Theme/Metrics";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import usePhotoModal from "../../Components/usePhotoModal";
import colors from "../../Theme/Colors";
import ImageComponentLoader from "../../Components/ImageComponentLoader";

export default function CreateProfile() {
    const dispatch = useDispatch()
    const userInfo = useUserState()
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(false);
    const [name, setName] = useState(() => {
        userInfo.user_name
    })
    const [isPhotoModal, setIsPhotoModal] = useState(false);
    const [imageBaseUrl, setImageBaseUrl] = useState('');
    const [image,setImage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(() => {
        userInfo.cell_no
    })

    const {renderPhotoModalJSX, isUploadingPhoto} =
        usePhotoModal({
            closeModal: setIsPhotoModal,
            isVisible: isPhotoModal,
            image,
            onSetPhoto: setImage,
            onSetBaseUrl: setImageBaseUrl,
            modalHeading: "Select Profile Picture",
            options: {
                cropperCircleOverlay: false,
                cropping: true,
                width: Metrics.screenWidth * 5,
                height: Metrics.screenWidth * 5,
            },
        });
    useEffect(() => {
        validateFields();
    }, [phoneNumber, name]);


    const validateFields = () => {
        if (!isFieldEmpty(name) && isNameFieldValid(name) && !isFieldEmpty(phoneNumber))
            setIsContinueButtonDisabled(false)
        else {
            setIsContinueButtonDisabled(true)
        }
    }
    const {
        onCallApi: onCallUpdateProfileAPI,
        loading: updateProfileLoading,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        // headers:{'Content-Type': 'multipart/form-data; '},
        endPoint: ApiService.user.updateUserProfile
    });

    const updateProfile = async () => {
        Keyboard.dismiss();
        const params = new FormData()
        params.append("user_name",name)
        params.append("cell_no",phoneNumber)
        params.append("profile_pic",image)//?image.data:'')
        // const params = {
        //     user_name: name,
        //     cell_no: phoneNumber,
        //     profile_pic:image?image.data:''
        // };
        const loginResponse = await onCallUpdateProfileAPI(params);
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if(data.error){
                showToast(data.message.error)
            }
            else{

                dispatch(signIn({...userInfo,user_name:name,cell_no:phoneNumber, profile_pic:data.data.profile_pic }))
                // Alert.alert(APP_STRINGS.APP_NAME, data.message,[{text:APP_STRINGS.OK, style:"default", onPress: () => {Navigator.goBack()},
                // }],{cancelable:false})
                // showToast(data.message)
                // Navigator.navigate('CreateProfile')
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }

    return (
        <RootView lightCircle showCircle isLoading={updateProfileLoading || isUploadingPhoto}>
            <Header title='Profile' showRight showLeft={false} onPressRight={()=>{
                dispatch(signIn({...userInfo, isSkipped:true}))
            }}/>
            <View style={styles.container}>
                <TouchableOpacity style={styles.image} onPress={()=>{setIsPhotoModal(true)}}>
                    <ImageComponentLoader source={image} inOnline={false} containerStyle={styles.image}/>
                {/*<Image defaultSource={Images.placeholder} source={{uri:image.data}} style={styles.image}/>*/}
                    <View style={styles.iconView}>
                        <Icon name={"upload"}
                              color="white" />
                    </View>

                </TouchableOpacity>
                <Input placeholder='Display Name' value={name} onChangeText={(val) => setName(val)}/>
                <Input placeholder='Phone Number' onChangeText={(val) => setPhoneNumber(val)}
                />
                <Text style={styles.text}>Provide your name and number so your friends can find you.</Text>
                <Button text='Done' disabled={isContinueButtonDisabled} onPress={() => updateProfile()}/>
            </View>
            {renderPhotoModalJSX()}

        </RootView>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: Metrics.largeMargin

    },
    image: {
        width: Metrics.screenWidth * 0.3,
        height: Metrics.screenWidth * 0.3,
        borderRadius: Metrics.screenWidth * 0.15,
        alignSelf: 'center',
        marginBottom: Metrics.largeMargin
    },
    text: {
        fontSize: 16,
        marginBottom: Metrics.largeMargin
    },
    iconView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 35,
        height: 35,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        borderColor: 'white',
        borderWidth: 1,
        zIndex: 10,
    },
})
