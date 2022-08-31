import {useEffect, useState, useRef, useCallback} from 'react';
import {Keyboard, Platform} from 'react-native';
import RtcEngine from 'react-native-agora';
import {requestAudioPermission} from '../Permissions/permissions';
import {logToConsole} from "../../Configs/ReactotronConfig";
import {agoraAppId, agoraAppToken, API_STATUS, isIos} from "../../Constants";
import useUserState from "../../CustomHooks/useUserState";
import {REQUEST_METHOD, useApiWrapper} from "../../CustomHooks/useApiWrapper";
import ApiService from "../../Services/ApiService";
import {showToast} from "../../Utils/ToastUtils";
import {
    AudioProfile,
    AudioRemoteState,
    AudioRemoteStateReason,
    AudioScenario
} from "react-native-agora/src/common/Enums";
// import Agora from  "agora-access-token";

export const useRequestAudioHook = () => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            // Request required permissions from Android

            requestAudioPermission().then(() => {
                console.log('requested!');
            });
        }
    }, []);
};


// const generateToken = (channel_name, isOpenedFromNotification) => {
//     const appID = agoraAppId;
//     const appCertificate = agoraAppCertificate;
//     const expirationTimeInSeconds = 3600;
//     const uid = Math.floor(Math.random() * 100000);
//     const role = isOpenedFromNotification ? Agora.RtcRole.SUBSCRIBER : Agora.RtcRole.PUBLISHER;
//     const channel = channel_name;
//     const currentTimestamp = Math.floor(Date.now() / 1000);
//     const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
//
//     const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
//     logToConsole({token})
//     return token
// }
export const useInitializeAgora = ( channel_name = '', isContact=false,joinCall = false) => {
    const user = useUserState()
    // Replace yourAppId with the App ID of your Agora project.
    const appId = agoraAppId;
    // const appId = 'ed3824ee1946496faddd7abde731c1c2';
    const [aggoraToken, setAggoraToken] = useState(agoraAppToken)// generateToken(channel_name, isOpenedFromNotification)// '006ded6b8286e3f4641a901f96e5c685f65IAAbDYLnX6n8UY0hRe13fBAN8k1H5jgnvXgV//nAdfTukYa0dcYAAAAAEABiLYCEqdL4YgEAAQCp0vhi'
    const [aggoraUid, setAggoraUid] = useState('0')// generateToken(channel_name, isOpenedFromNotification)// '006ded6b8286e3f4641a901f96e5c685f65IAAbDYLnX6n8UY0hRe13fBAN8k1H5jgnvXgV//nAdfTukYa0dcYAAAAAEABiLYCEqdL4YgEAAQCp0vhi'
    // '006ed3824ee1946496faddd7abde731c1c2IADawTPNWer1xA5PeSnIDlYUmh0gnu35sjEiAJxf2/wp0Ya0dcYAAAAAEAArT8zLxSS8YgEAAQDEJLxi'
    // '0061af140d1d92848d4a4f315e62e37727bIAB+fGiaLhFQO3PXJPVULfFjNcwWEn6Jp0We13gBM2/eQYa0dcYAAAAAEABVr+ww+rO+XwEAAQD6s75f';

    const [channelName, setChannelName] = useState('my-channel');
    const [joinSucceed, setJoinSucceed] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const [isMute, setIsMute] = useState(false);
    const [isSpeakerEnable, setIsSpeakerEnable] = useState(true);
    const [peerMuted, setPeerMuted] = useState({id:'', isMute:false});
    const rtcEngine = useRef(null);
    const {
        onCallApi: onCallApiToGetToken,
        loading: onLoadingToken,
    } = useApiWrapper({
        type: REQUEST_METHOD.GET,
        endPoint: ApiService.aggora.getToken
    });
    const {
        onCallApi: onCallAPITokenAndGenratePush,
        loading: onLoadingTokenWithPush,
    } = useApiWrapper({
        type: REQUEST_METHOD.POST,
        endPoint: ApiService.aggora.getTokenAndPush
    });
    const onLoadingChannels=onLoadingToken || onLoadingTokenWithPush

    const getTokenFromServer = async () => {
        // https://bff-test-app.herokuapp.com/rtc/channel-test/publisher/uid/0/?expiry=60

        const response = await onCallApiToGetToken({channel_name: channel_name},);
        const {ok = false, status, data = {}} = response || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if (data.error) {
                showToast(data.message)
            } else {
                setAggoraToken(data.aggora_token)
                setAggoraUid(data.uid)
                const uid = Number(data.uid)
                // setIsMute(false)
                // setIsSpeakerEnable(false)
                setPeerMuted({id:'',isMute: false});

                await rtcEngine.current?.joinChannel(data.aggora_token, channel_name, null, uid);
            }
        } else {

        }
    }
    const getTokenAndSendPushFromServer = async () => {
        // https://bff-test-app.herokuapp.com/rtc/channel-test/publisher/uid/0/?expiry=60

        let params  = {
            channel_or_contact_id: channel_name,
            is_contact:isContact+"",
            isHost:"true"
        }
        const response = await onCallAPITokenAndGenratePush(params);
        const {ok = false, status, data = {}} = response || {};
        if (ok && API_STATUS.SUCCESS.includes(String(status))) {
            if (data.error) {
                showToast(data.message)
            } else {
                logToConsole({data})
                setAggoraToken(data.aggora_token)
                setAggoraUid(data.uid)
                const uid = Number(data.uid)
                setChannelName(data.channel_name)

                logToConsole({token:data.aggora_token, channelName:data.channel_name, uid})
                await rtcEngine.current?.joinChannel(data.aggora_token, data.channel_name, null, uid);
                // const etcjannelReward = await rtcEngine.current?.joinChannel(data.aggora_token/*, channel_name, null, data.uid*/);
                // logToConsole({etcjannelReward})
            }
        } else {

        }
    }

    const initAgora = useCallback(async () => {
        rtcEngine.current = await RtcEngine.create(appId);
        rtcEngine.current.setAudioProfile(AudioProfile.SpeechStandard, AudioScenario.MEETING)

        await rtcEngine.current?.stopChannelMediaRelay()
        await rtcEngine.current?.enableAudio();
        await rtcEngine.current?.enableLocalAudio(true);
        await rtcEngine.current?.muteLocalAudioStream(false);
        await rtcEngine.current?.setEnableSpeakerphone(true);
        await rtcEngine.current?.enableDeepLearningDenoise(true);
        //  await rtcEngine.current?.renewToken('7987898')
        // let temp = rtcEngine.current?.("token-privilege-will-expire", async function () {
        //     var newToken = await rtcEngine.current.renewToken(token);
        //     setToken(newToken)
        //     logToConsole({token})
        // });


        rtcEngine.current?.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);

            setPeerIds((peerIdsLocal) => {
                if (peerIdsLocal.indexOf(uid) === -1) {
                    return [...peerIdsLocal, uid];
                }

                return peerIdsLocal;
            });
        });

        rtcEngine.current?.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            const remainingPears = peerIds.filter((id) => id !== uid)
            if (remainingPears.length === 0) {
                leaveChannel()
            }

            setPeerIds((peerIdsLocal) => {
                return peerIdsLocal.filter((id) => id !== uid);
            });
        });


        rtcEngine.current?.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {

                setJoinSucceed(true);

                setPeerIds((peerIdsLocal) => {
                    return [...peerIdsLocal, uid];
                });
            },
        );
        rtcEngine.current?.addListener(
            'RemoteAudioStateChanged',
            (  uid,
               state,
               reason,) => {
                setPeerMuted({id:uid, isMute: reason === 5 && state === 0})
            },
        );

        rtcEngine.current?.addListener('Error', (error) => {
            console.log('Error', error);
        });
    }, []);

    const joinChannel = useCallback(async () => {

        // setIsMute(false)
        // setIsSpeakerEnable(false)
        // setPeerMuted({id:'',isMute: false});

        if (peerIds.length === 5) {
            alert('Channel Maximum Limit Reached')
        } else {
            // rtcEngine.current.pauseAllChannelMediaRelay()
            if(joinCall){
                await getTokenFromServer()
            }
            else {
                await getTokenAndSendPushFromServer()
            }
            await getTokenFromServer().then()
        }

    }, [channelName]);

    const leaveChannel = useCallback(async () => {
        await rtcEngine.current?.leaveChannel();

        setPeerIds([]);
        setJoinSucceed(false);
        setPeerMuted({id:'',isMute: false});
    }, []);

    const toggleIsMute = useCallback(async () => {
        await rtcEngine.current?.muteLocalAudioStream(!isMute);
        setIsMute(!isMute);
    }, [isMute]);

    const toggleIsSpeakerEnable = useCallback(async () => {
        await rtcEngine.current?.setEnableSpeakerphone(!isSpeakerEnable);
        setIsSpeakerEnable(!isSpeakerEnable);
    }, [isSpeakerEnable]);

    const destroyAgoraEngine = useCallback(async () => {
        await rtcEngine.current?.destroy();
    }, []);

    useEffect(() => {
        initAgora();

        return () => {
            destroyAgoraEngine();
        };
    }, [destroyAgoraEngine, initAgora]);

    return {
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
        onLoadingChannels,
        peerMuted,
    };
};
