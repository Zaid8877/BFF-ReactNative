import {View, Text, Image, StyleSheet, Keyboard} from 'react-native'
import React, {useEffect, useState} from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Images from '../../Utils/Images'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import {Metrics} from '../../Theme'
import {useDispatch} from 'react-redux'
import {signIn} from '../../Store/actions/user'
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import useUserState from "../../CustomHooks/useUserState";
import {API_STATUS, isEmailValid, isFieldEmpty, isNameFieldValid, isPasswordValid} from "../../Constants";
import {logToConsole} from "../../Configs/ReactotronConfig";
import {showToast} from "../../Utils/ToastUtils";

export default function CreateProfile() {
    const dispatch = useDispatch()
    const userInfo = useUserState()
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(false);
    const [name, setName] = useState(() => {
        userInfo.user_name
    })
    const [phoneNumber, setPhoneNumber] = useState(() => {
        userInfo.cell_no
    })

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
        endPoint: ApiService.user.updateUserProfile
    });

    const updateProfile = async () => {
        Keyboard.dismiss();
        const params = {
            user_name: name,
            cell_no: phoneNumber,
        };
        const loginResponse = await onCallUpdateProfileAPI(params);
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            logToConsole({data})
            if(data.error){
                showToast(data.message)
            }
            else{
                dispatch(signIn({...userInfo,name:name,cell_no:phoneNumber }))
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
        <RootView lightCircle showCircle isLoading={updateProfileLoading}>
            <Header title='Profile' showRight showLeft={false}/>
            <View style={styles.container}>
                <Image source={Images.person} style={styles.image}/>
                <Input placeholder='Display Name' value={name} onChangeText={(val) => setName(val)}/>
                <Input placeholder='Phone Number' onChangeText={(val) => setPhoneNumber(val)}
                />
                <Text style={styles.text}>Provide your name and number so your friends can find you.</Text>
                <Button text='Done' disabled={isContinueButtonDisabled} onPress={() => updateProfile()}/>
            </View>
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
    }
})
