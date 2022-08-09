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
import {
    API_STATUS,
    APP_STRINGS,
    isConfirmPasswordCorrect,
    isEmailValid,
    isFieldEmpty,
    isNameFieldValid,
    isPasswordValid
} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";

const ForgotPassword = ({route}) => {
    const {email} = route.params
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isChangedPasswordDisabled, setIsChangedPasswordDisabled] = useState(false);

    const {
        onCallApi: onCallChangePasswordApi,
        loading: changePasswordPasswordLoading,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.auth.updatePasswordByEmail,
    });

    useEffect(() => {
        validateFields()
    }, [password,confirmPassword])


    const validateFields = () => {
        if (isPasswordValid(password) && isConfirmPasswordCorrect(password, confirmPassword))
            setIsChangedPasswordDisabled(false)
        else {
            setIsChangedPasswordDisabled(true)
        }
    }
    const onChangePassword = async () => {
        Keyboard.dismiss();
        const params = {
            email: email.trim().toLowerCase(),
            password: password
        };
        const changePasswordResponse = await onCallChangePasswordApi(params);
        const {ok = false, status, data = {}} = changePasswordResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if (data.error) {
                showToast(data.message)
            } else {
                Alert.alert('Successful!', 'Password Changed Successfully', [{
                    text: "Okay", onPress: () => {
                        Navigator.navigate('SignIn')
                    }
                }])
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }

    return (
        <RootView style={styles.container} isLoading={changePasswordPasswordLoading}>
            <Heading text="Forgot Password"/>
            <Text style={styles.text}>Enter new password.</Text>
            <Input
                value={password}
                onChangeText={(val) => setPassword(val)}
                placeholder='New Password'
                secureTextEntry
                icon='lock-outline'
            />
            <Input
                value={confirmPassword}
                onChangeText={(val) => setConfirmPassword(val)}
                placeholder='Confirm Password'
                secureTextEntry
                icon='lock-outline'
            />
            <Button text='Send' disabled={isChangedPasswordDisabled} onPress={() =>
                // Navigator.navigate('Verification')
                onChangePassword()
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
