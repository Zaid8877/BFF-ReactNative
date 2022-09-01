import {View, Text, FlatList, Keyboard, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import {Colors, Metrics} from '../../Theme';
import Images from '../../Utils/Images';
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {API_STATUS} from "../../Constants";
import {showToast} from "../../Utils/ToastUtils";
import NoRecordFound from "../../Components/NoRecordFoundComponent";
import Navigator from "../../Utils/Navigator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useRecentChannelState from "../../CustomHooks/useRecentChannelState";
import ContactsItem from "../../Components/ContactsItem/ContactsItem";
import Button from "../../Components/Button";
import TabButton from "../../Components/TabButton/TabButton";
import colors from "../../Theme/Colors";

import {useDispatch} from "react-redux";
import {setRecentChannel} from '../../Store/actions/RecentChannelActions'
import {useIsFocused} from "@react-navigation/native";

const ChannelDetail = ({route}) => {
    let recentCalls = useRecentChannelState();
    const dispatch= useDispatch()
    const {channel} = route.params
    const chanelHistory = useRecentChannelState().filter(item => {
        return channel.id === item.id && item.callType!=='contact'
    })
    const [channelDetail,setChannelDetail]=useState({})
    const {participants} = channelDetail

    const [isDataLoaded, setDataLoaded] = useState(false)
    useEffect(() => {
        getChannels().then()
    }, [useIsFocused()])

    const {
        onCallApi: onCallGetChannelDetailApi,
        loading: onLoadingChannels,
    } = useApiWrapper({
        type: REQUEST_METHOD.GET,
        endPoint: ApiService.channels.getChannelDetail
    });

    const {
        onCallApi: onCallApiToDeleteChannel,
        loading: onDeletingChannel,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.channels.delete
    });
    const getChannels = async () => {
        Keyboard.dismiss();

        const loginResponse = await onCallGetChannelDetailApi({}, '/'+channel.id);
        const {ok = false, status, data = {}} = loginResponse || {};
        setDataLoaded(true)
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if (data.error) {
                showToast(data.message)
            } else {
                let channelDetail=data.channel
                channelDetail.participants = data.participants
                setChannelDetail(channelDetail)
                // setChannels(replaceData ? data.data : channels.length === 0 ? data.data : channels.concat(data.data))
                // setTotalRecords(data.totalRecords)
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }

    const onDeleteChannel = async () => {
        Keyboard.dismiss();

        const param={
            channel_id: channel.id
        }
        const loginResponse = await onCallApiToDeleteChannel(param);
        const {ok = false, status, data = {}} = loginResponse || {};
        setDataLoaded(true)
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if (data.error) {
                showToast(data.message)
            } else {
                deleteChannelFromRecent()
                Alert.alert("Success",
                    "Channel Deleted Successfully.",
                    [
                        {
                            text:"Ok",
                            style:'default',
                            onPress:()=>{
                                Navigator.goBack()
                            }
                        }
                        ],
                    {cancelable:false}
                )
            }
        } else {
            const {message = ''} = data || {};
            showToast(message)
        }
    }
    const deleteChannelFromRecent=()=>{
        let arr = []
         recentCalls.map((itemChannel,index)=>{
                if(itemChannel.callType === "channel" && channel.id === itemChannel.id){
                }
                else{
                    arr.push(itemChannel)
                }

            })

        dispatch(setRecentChannel(arr))
    }

   const [showCallHistory, setShowCallHistory]=useState(false)
    const renderRightView=()=>{
        return  <View  style={styles.iconView}>
            <Icon name='call-made' size={32} color='white' />
        </View>
    }

    const showDeleteAlert = () => {
        Alert.alert("Confirmation","Are you sure you want to delete this Channel?" ,
            [{
                text:"Yes",
                onPress: ()=>{onDeleteChannel()},
                style: 'default'
            },{
                text:'Cancel',
                style: 'cancel',
                onPress:()=>{}
            }]);
    }
    return (
        <RootView statusBar={Colors.lightGrey} isLoading={onLoadingChannels||onDeletingChannel}>

            <Header secondary title='Channel Detail'  showAddIcon={true} addIconName={'phone'} onPressRight={()=>{
                Navigator.navigate("CallScreen",{channel:channelDetail})
            }} leftIcon='chevron-left'
                    onPressLeft={() => Navigator.goBack()}/>

            {isDataLoaded && <>
                {/*<View style={{flexDirection: 'row', marginTop: 10,}}>*/}
                {/*    <TabButton containerStyle={{flex: 1, height: 50}} name='Participants' isSelected={!showCallHistory}*/}
                {/*               onItemPress={() => {*/}
                {/*                   setShowCallHistory(false)*/}
                {/*               }}/>*/}
                {/*    <TabButton containerStyle={{flex: 1, height: 50}} name='Call History' isSelected={showCallHistory}*/}
                {/*               onItemPress={() => {*/}
                {/*                   setShowCallHistory(true)*/}
                {/*               }}/>*/}

                {/*</View>*/}
                <View style={{margin: Metrics.defaultMargin, flex: 1}}>
                    {/*{!showCallHistory &&*/}
                        <FlatList
                            style={{paddingTop: Metrics.defaultMargin, flex:1}}
                            data={participants}
                            keyExtractor={item => item.id}
                            ListEmptyComponent={isDataLoaded ? <NoRecordFound message={"No Participant Found"}/> : null}
                            renderItem={({item}) => (
                                <ContactsItem
                                    showIcon={false}
                                    item={item}
                                    onPress={(id) => {
                                        Navigator.navigate("UserProfile", {userId: item.id})
                                    }}
                                />
                            )}
                        />
                    {/*}*/}
                    {/*{showCallHistory &&*/}
                    {/*    <FlatList*/}
                    {/*        style={{paddingTop: Metrics.defaultMargin, flex:1}}*/}
                    {/*        data={chanelHistory}*/}
                    {/*        keyExtractor={item => item.id}*/}
                    {/*        ListEmptyComponent={isDataLoaded ? <NoRecordFound message={"No Channels Found"}/> : null}*/}
                    {/*        renderItem={({item}) => (*/}
                    {/*            <Item*/}
                    {/*                showIcon={false}*/}
                    {/*                item={item}*/}
                    {/*                style={{backgroundColor: Colors.lightGrey}}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*}*/}
                    <View style={{flexDirection:'row',alignItems:'center',margin:Metrics.defaultMargin, flex:0.15, justifyContent:'center'}}>
                        <Button text={"Edit Channel"} style={{paddingLeft:Metrics.defaultMargin,paddingRight:Metrics.defaultMargin, marginRight:Metrics.smallMargin}} onPress={()=>{
                            Navigator.navigate("CreateChannel",{channel:channelDetail})
                        }}/>
                        <Button text={"Delete Channel"}  textStyle={{color:colors.red}} style={{paddingLeft:Metrics.defaultMargin,paddingRight:Metrics.defaultMargin}} secondary={true} onPress={()=>{showDeleteAlert()}}/>
                    </View>
                </View>

            </>
            }
        </RootView>
    );
}


const styles = StyleSheet.create({
    iconViewGenerateCall: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconView: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default ChannelDetail
