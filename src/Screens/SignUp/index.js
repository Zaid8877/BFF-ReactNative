import {View, Text, StyleSheet, Keyboard, Alert} from 'react-native'
import React, {useEffect} from 'react'
import RootView from '../../Components/RootView'
import Heading from '../../Components/Heading'
import {Metrics} from '../../Theme'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import {useState} from 'react'
import Navigator from '../../Utils/Navigator'
import {API_STATUS, APP_STRINGS, isEmailValid, isFieldEmpty, isNameFieldValid, isPasswordValid} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import { useDispatch } from 'react-redux'
import {signIn} from '../../Store/actions/user'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignupButtonDisabled, setIsSignupButtonDisabled] = useState(false);
    const dispatch = useDispatch()


    const {
        onCallApi: onCallRegisterApi,
        loading: registerLoading,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.auth.register,
    });


    useEffect(() => {
        validateFields()
    }, [name, email, password])


    const validateFields = () => {
        if (!isFieldEmpty(name) && isNameFieldValid(name) && !isFieldEmpty(email) && isEmailValid(email) && !isFieldEmpty(password) && isPasswordValid(password))
            setIsSignupButtonDisabled(false)
        else {
            setIsSignupButtonDisabled(true)
        }
    }
    const register = async () => {
        Keyboard.dismiss();
        const params = {
             name: name,
            email: email.trim().toLowerCase(),
            password: password,
        };
        const loginResponse = await onCallRegisterApi(params);
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if(data.error){
                showToast(data.message)
            }
            else{
                dispatch(signIn(data))
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
        <RootView isLoading={registerLoading}>
            <Icon name={'chevron-left'} size={32} style={{margin:Metrics.defaultMargin}} onPress={()=>{Navigator.goBack()}} />
            <View style={styles.container}>
            <Heading text="Sign Up" />
            <Text style={styles.text}>Please type your information below</Text>
            <Input
                value={name}
                onChangeText={(val) => setName(val)}
                placeholder='Full Name'
            />
            <Input
                value={email}
                onChangeText={(val) => setEmail(val)}
                placeholder='Email'
                keyboardType='email-address'
                icon='email-outline'
            />
            <Input
                value={password}
                onChangeText={(val) => setPassword(val)}
                placeholder='Password'
                secureTextEntry
                icon='lock-outline'
            />
            <Button text='Sign Up' disabled={isSignupButtonDisabled}
                    onPress={() =>
                        // Navigator.navigate('CreateProfile')
                        register()
                    }/>
            </View>
        </RootView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Metrics.largeMargin,
    },
    text: {
        fontSize: 16,
        marginVertical: Metrics.defaultMargin
    }
})

export default SignUp
