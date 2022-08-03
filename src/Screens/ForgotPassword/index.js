import {View, Text, StyleSheet, Keyboard, Alert} from 'react-native'
import React, {useEffect} from 'react'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import {Metrics} from '../../Theme'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import {useState} from 'react'
import Navigator from '../../Utils/Navigator'
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS, APP_STRINGS, isEmailValid, isFieldEmpty, isNameFieldValid, isPasswordValid} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const [isForgotPasswordButtonVisible, setIsForgotPasswordButtonVisible] = useState(false);

    const {
        onCallApi: onCallForgotPasswordApi,
        loading: forgotPasswordLoading,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.auth.forgotPassword,
    });

    useEffect(() => {
        validateFields()
    }, [email])


    const validateFields = () => {
        if (!isFieldEmpty(email) && (isEmailValid(email)  || isPasswordValid(email)))
            setIsForgotPasswordButtonVisible(false)
        else {
            setIsForgotPasswordButtonVisible(true)
        }
    }
    const forgotPassword = async () => {
        Keyboard.dismiss();
        const params = {
            email: email.trim().toLowerCase(),
        };
        const forgotPasswordResponse = await onCallForgotPasswordApi(params);
        const {ok = false, status, data = {}} = forgotPasswordResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if(data.error){
                showToast(data.message)
            }
            else{
                Navigator.navigate('Verification',{email:email})
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }

    return (
        <RootView style={styles.container} isLoading={forgotPasswordLoading}>
            <Heading text="Forgot Password"/>
            <Text style={styles.text}>Please type your email or phone number below</Text>
            <Input
                value={email}
                onChangeText={(val) => setEmail(val)}
                placeholder='Email or Phone Number'
                keyboardType='email-address'
            />
            <Button text='Send' disabled={isForgotPasswordButtonVisible} onPress={() =>
                // Navigator.navigate('Verification')
                forgotPassword()
            }
            />
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
export default ForgotPassword;
