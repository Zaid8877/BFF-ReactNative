import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RootView from '../../Components/RootView';
import {Colors, Metrics} from '../../Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';
import {useInitializeAgora, useRequestAudioHook} from '../../Components/Hooks/hooks';
import useRecentChannelState from "../../CustomHooks/useRecentChannelState";
import {useDispatch} from "react-redux";
import {setRecentChannel} from '../../Store/actions/RecentChannelActions'
import Button from '../../Components/Button/index'
import ContactsItem from "../../Components/ContactsItem/ContactsItem";
import useUserState from "../../CustomHooks/useUserState";


export default function CallScreen({route}) {
    const userInfo=useUserState()
    let recentCalls = useRecentChannelState();
    const {channel,contact} = route.params
    const isHost = true
    useRequestAudioHook();
    const dispatch= useDispatch()

    const getContactChannel=(contactId, userId)=>{
        if(isHost){
            return userId+"_"+contactId
        }
        else{
            return contactId+"_"+userId;
        }
    }
    const {
        channelName,
        isMute,
        isSpeakerEnable,
        joinSucceed,
        peerIds,
        setChannelName,
        joinChannel,
        leaveChannel,
        toggleIsMute,
        toggleIsSpeakerEnable,
    } = useInitializeAgora(contact?"channel_"+getContactChannel(contact.id, userInfo.id): channel.channel_name.replace("","-"));
    // useEffect(()=>{setChannelName(channel.channel_name.replace(" ","-"))},[])
    // useEffect(()=>{onJoinChannel()},[channel])


    const onJoinChannel = ()=>{
          joinChannel().then(item=>{
        })
        const callType=contact?"contact":"channel"
        const dataToSave = contact?contact:channel
        dataToSave.callType=callType
        if (recentCalls.size === 0) {
            recentCalls.push(dataToSave)
        }
        else{
            let arr = []
            arr.push(dataToSave)
            recentCalls.map((itemChannel,index)=>{
                if(itemChannel.callType === callType && dataToSave.id === itemChannel.id){
                }
                else{
                    arr.push(itemChannel)
                }

            })
            recentCalls = arr
        }

        dispatch(setRecentChannel(recentCalls))
    }
    const onLeaveChannel = ()=>{
        leaveChannel()
        Navigator.goBack()

    }

    return (
        <RootView statusBar={Colors.primary}>
            <StatusBar backgroundColor={Colors.primary} barStyle='light-content'/>
            <View style={styles.header}>
                <Icon name="chevron-left" color={Colors.white} size={32} onPress={() => Navigator.goBack()}/>
                        <Text style={[styles.heading,{flex:1, textAlign:'center'}]}>{contact?contact.name:channel.channel_name}</Text>

            </View>

            {/*<View style={[styles.item]}>*/}
            {/*    <View style={styles.imageView}>*/}
            {/*        <Image source={Images.soundWaves} style={styles.image}/>*/}

            {/*        <View style={styles.iconView}>*/}
            {/*            <Icon name="check" color="white"/>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={styles.textView}>*/}
            {/*        <Text style={[styles.heading]}>{'Echo'}</Text>*/}
            {/*        <Text style={[styles.text]}>{'Talk to me to test the audio'}</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}


            <View style={{flex: 1, margin:Metrics.defaultMargin}}>
                {/*<Button*/}
                {/*    onPress={peerIds.length > 2 ? alert('Only 2 User are Allowed in the Channel') : joinSucceed ? leaveChannel : joinChannel}*/}
                {/*    title={`${joinSucceed ? 'Leave' : 'Join'} channel`}*/}
                {/*/>*/}

                {joinSucceed &&
                    <View>
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 26}}>Connection Status</Text>
                        <Text style={{
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>{peerIds.length > 1 ? 'Connected' : 'Ringing'}</Text>
                    </View>
                }
                {channel && channel.participantsList.length > 0 &&
                    <FlatList
                        style={{paddingTop: Metrics.defaultMargin}}
                        data={channel.participantsList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <ContactsItem
                                showIcon={false}
                                item={item}
                                style={{backgroundColor: Colors.lightGrey}}
                            />
                        )}
                    />
                }
                {contact && <View style={{flex:1}}><ContactsItem
                    showIcon={false}
                    item={contact}
                    style={{backgroundColor: Colors.lightGrey}}
                />
                </View>
                    }

                {/* <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={peerIds.length > 2 ? alert('Only 2 User are Allowed in the Channel') : joinSucceed ? leaveChannel : joinChannel}>
                    <View style={styles.outerView}>
                      <View style={styles.innerView}>
                        <Icon name="microphone" color={Colors.white} size={150} />
                      </View>
                    </View>
                  </TouchableOpacity> */}
                <View style={{justifyContent:'flex-end'}}>
                      {joinSucceed && <Button text={"End Call"} style={{backgroundColor:'red'}} onPress={onLeaveChannel} />}
                      {!joinSucceed &&
                          <Button text={"Start Call"} onPress={onJoinChannel}/>
                      }
                </View>
            </View>

            {/*<View style={{paddingVertical: Metrics.defaultMargin}}>*/}
            {/*    <View style={styles.bottomView}>*/}
            {/*        <View style={[styles.row, {width: '30%'}]}>*/}
            {/*            <Entypo name='signal' style={styles.icon}/>*/}
            {/*            <Icon name='play-circle-outline' style={[styles.icon, {marginLeft: 30}]}/>*/}
            {/*        </View>*/}

            {/*        <View style={[styles.row, styles.status]}>*/}
            {/*            <Icon name='checkbox-marked-circle' color='white' size={20}/>*/}
            {/*            <Text style={{color: Colors.light, fontSize: 16, marginLeft: 5}}>Available</Text>*/}
            {/*        </View>*/}

            {/*        <View style={[styles.row, {width: '30%'}]}>*/}
            {/*            <Icon name='signal' style={styles.icon}/>*/}
            {/*        </View>*/}

            {/*    </View>*/}
            {/*</View>*/}
        </RootView>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.primary,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.defaultMargin,
        marginBottom: Metrics.defaultMargin,
        overflow: 'hidden',
    },
    imageView: {
        width: Metrics.screenWidth * 0.15,
        height: Metrics.screenWidth * 0.15,
        borderRadius: Metrics.screenWidth * 0.15,
        backgroundColor: Colors.white,
        padding: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        tintColor: Colors.primary,
    },
    iconView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderColor: 'white',
        borderWidth: 1,
        zIndex: 10,
    },
    textView: {
        marginLeft: Metrics.defaultMargin,
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.white,
    },
    text: {
        fontSize: 16,
        color: Colors.white,
    },
    header: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Metrics.defaultMargin,
    },
    outerView: {
        width: Metrics.screenWidth * 0.7,
        height: Metrics.screenWidth * 0.7,
        borderRadius: Metrics.screenWidth * 0.5,
        backgroundColor: Colors.primary,
        alignSelf: 'center',
        padding: 10,
    },
    innerView: {
        width: '100%',
        height: '100%',
        borderColor: Colors.white,
        borderWidth: 5,
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: Metrics.defaultMargin
    },
    status: {
        backgroundColor: 'green',
        borderRadius: 30,
        padding: 10,
        width: '30%',
        marginHorizontal: '5%'
    },
    icon: {
        color: Colors.primary,
        fontSize: 20,
    },
    iconViewGenerateCall: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
