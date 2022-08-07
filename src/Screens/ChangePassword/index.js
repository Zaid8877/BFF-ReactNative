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

const ForgotPassword = ({route}) => {
    const {email}=route.params
    const [password,setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')

    const [isChangePasswordVisibile, setIsChangeaPasswordVisibile] = useState(false);

    const {
        onCallApi: onCallChangePasswordApi,
        loading: changePasswordPasswordLoading,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.auth.updatePasswordByOTP,
    });

    useEffect(() => {
        validateFields()
    }, [email])


    const validateFields = () => {
        if (isPasswordValid(password) && isConfirmPasswordCorrect(password, confirmPassword))
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
        const changePasswordResponse = await onCallChangePasswordApi(params);
        const {ok = false, status, data = {}} = changePasswordResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if(data.error){
                showToast(data.message)
            }
            else{
                Navigator.navigate('SignIn')
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
                value={password}
                onChangeText={(val) => setPassword(val)}
                placeholder='Password'
                secureTextEntry
                icon='lock-outline'
            />
            <Input
                value={confirmPassword}
                onChangeText={(val) => setConfirmPassword(val)}
                placeholder='Password'
                secureTextEntry
                icon='lock-outline'
            />
            <Button text='Send' disabled={isChangePasswordVisibile} onPress={() =>
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
