import {View, Text, Image, StyleSheet, TouchableOpacity, Keyboard} from 'react-native'
import React, {useEffect, useState} from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Button from '../../Components/Button'
import Navigator from '../../Utils/Navigator'
import {Colors, Metrics} from '../../Theme'
import Images from '../../Utils/Images'
import QRCode from 'react-native-qrcode-svg';
import useUserState from "../../CustomHooks/useUserState";
import Input from "../../Components/Input";
import {API_STATUS, isFieldEmpty, isNameFieldValid} from "../../Constants";
import SelectContactsBottomSheet from "../../Components/SelectContactsBottomSheet";
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {showToast} from "../../Utils/ToastUtils";
import {logToConsole} from "../../Configs/ReactotronConfig";
import channels from "../Channels";
import colors from "../../Theme/Colors";

const CreateChannel=({route})=> {
    const {channel}=route.params ?? {}
    const isEditingChannel=!!channel
    console.warn(isEditingChannel)
    console.warn(!!channel)
    const [isCreateChannelFilled, setIsCreateChannelFilled] = useState(false);
    const [showListContacts, setShowListContacts] = useState(false);
    const [channelName, setChannelName] = useState('')
    const [participants, setParticipants] = useState([])
    const [participantsText, setParticipantText] = useState('')
    const userInfo = useUserState()


    useEffect(() => {
        validateFields()
    }, [channelName, participantsText])

    useEffect(()=>{
        if(isEditingChannel){
            setChannelName(channel.channel_name)
            setParticipants(channel.participants)
            setParticipantText(getContactName(channel.participants))

        }
    },[])
    const {
        onCallApi: onCallCreateChannel,
        loading: onCreatingChannel,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: isEditingChannel?ApiService.channels.update:ApiService.channels.create
    });

    const onCreateChannel = async () => {
        Keyboard.dismiss();
        const params = {
            channel_name:channelName.trim(),
            participants:getContactIds().trim(),
        };
        if(isEditingChannel){
            params.channel_id=channel.id
        }
        const loginResponse = await onCallCreateChannel(params);
        const {ok = false, status, data = {}} = loginResponse || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            console.log({loginResponse})
            if(data.error){
                showToast(data.message)
            }
            else{
                Navigator.goBack()
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }
    const validateFields = () => {
        if (!isFieldEmpty(channelName) && isNameFieldValid(channelName) && participants.length > 0)
            setIsCreateChannelFilled(false)
        else
            setIsCreateChannelFilled(true)
    }

    const renderBottomSheet = () => {
        return <SelectContactsBottomSheet
            isVisible={showListContacts}
            selectedContacts={participants}
            onBackKeyPress={() => {
                setShowListContacts(false)
            }} onDoneButtonPressed={(contacts) => {
            setShowListContacts(false)
            // var newContact = contacts
            if(isEditingChannel) {
                var newContact = participants.concat(contacts.filter((item, index) => {
                    return participants.indexOf(item) < 0
                }))
                setParticipants(newContact)
                setParticipantText(getContactName(newContact))
            }
            else{
                setParticipants(contacts)
                setParticipantText(getContactName(contacts))
            }
        }}/>

    }
    const getContactIds = (contacts=participants)=>{
        let ids = ''
        contacts.map(item=>{
            ids+=item.id+",";
        })
        ids = ids.substring(0, ids.length-1)
        return ids;
    }
    const getContactName = (contacts=participants)=>{
        let ids = ''
        contacts.map(item=>{
            ids+=item.name+" ,";
        })
        ids = ids.substring(0, ids.length-2)
        return ids;
    }

    return (
        <RootView statusBar={Colors.lightGrey} isLoading={onCreatingChannel}>

            <Header secondary title={isEditingChannel?'Edit Channel':'Create Channel'} showAddIcon={false} leftIcon='chevron-left'
                    onPressLeft={() => Navigator.goBack()}/>
            <View style={{padding: Metrics.defaultMargin}}>
                <Input
                    value={channelName}
                    editable={!isEditingChannel}
                    style={isEditingChannel? {color:colors.grey}:{}}
                    onChangeText={(val) => setChannelName(val)}
                    placeholder='Channel Name'
                    keyboardType='default'
                />

                <TouchableOpacity
                    onPress={() => {
                        setShowListContacts(true)
                    }}>
                    <Input
                        value={participantsText}
                        editable={false}
                        placeholder='Participants'
                        keyboardType=''
                        icon='arrow-down'
                    />
                </TouchableOpacity>
                <Button text={isEditingChannel?'Update':'Create Channel'} disabled={isCreateChannelFilled}
                        onPress={() => onCreateChannel().then()}/>
            </View>
            {renderBottomSheet()}

        </RootView>
    )
}

const styles = StyleSheet.create({
    qr: {
        width: Metrics.screenHeight * 0.28,
        height: Metrics.screenHeight * 0.36,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    bff: {
        height: 32,
        width: 100,
        resizeMode: 'contain'
    },
    divider: {
        height: 2,
        backgroundColor: Colors.lightGrey,
        width: '45%'
    }
})
export default CreateChannel
