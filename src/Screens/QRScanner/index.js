import {View, Text, Keyboard, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Navigator from '../../Utils/Navigator'
import {Colors, Metrics} from '../../Theme'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import colors from '../../Theme/Colors'
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";

export default function QRScanner() {
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(false);
    // const [userData, setUserdata] = useState('')
    //
    // useEffect(()=>{
    //     addContact('12')
    // },[])
    const {
        onCallApi: onCallAddContactAPI,
        loading: onAddingContact,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.contact.addContact
    });

    const addContact = async (id) => {
        Keyboard.dismiss();
        const params = {
            user_id:id,
        };
        const loginResponse = await onCallAddContactAPI(params);
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            console.log({loginResponse})
            if(data.error){
                showToast(data.message)
            }
            else{
                Navigator.navigate('Contacts')
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
        <RootView statusBar={Colors.lightGrey} isLoading={onAddingContact}>
            <Header secondary title='Scan' showAddIcon={false} leftIcon='chevron-left'
                    onPressLeft={() => Navigator.goBack()}/>

            <QRCodeScanner
                reactivate={!onAddingContact}
                onRead={(e) => {
                    if(onAddingContact)
                        return;
                    const data = e.data;
                    if(data!=null && data!=='') {
                        const user = JSON.parse(data);
                        if(user!=null && user.id){
                            addContact(user.id)
                            return;
                        }
                    }
                    Alert.alert("Error","Invalid code scanned.")

                }}
                showMarker={true}
                markerStyle={{borderColor: colors.primary}}
                cameraStyle={{width: Metrics.screenWidth * 0.9, height: Metrics.screenWidth * 0.9, alignSelf: 'center'}}
            />
        </RootView>
    )
}
