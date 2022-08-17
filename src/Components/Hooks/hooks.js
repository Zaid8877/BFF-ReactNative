import {useEffect, useState, useRef, useCallback} from 'react';
import {Platform} from 'react-native';
import RtcEngine from 'react-native-agora';
import {requestAudioPermission} from '../Permissions/permissions';
import {logToConsole} from "../../Configs/ReactotronConfig";
import {agoraAppCertificate, agoraAppId,agoraAppToken} from "../../Constants";
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
export const useInitializeAgora = (channel_name = 'my-channel', isOpenedFromNotification = false) => {
    logToConsole({channel_name})
    // Replace yourAppId with the App ID of your Agora project.
    const appId = agoraAppId;
    // const appId = 'ed3824ee1946496faddd7abde731c1c2';
    let token = agoraAppToken// generateToken(channel_name, isOpenedFromNotification)// '006ded6b8286e3f4641a901f96e5c685f65IAAbDYLnX6n8UY0hRe13fBAN8k1H5jgnvXgV//nAdfTukYa0dcYAAAAAEABiLYCEqdL4YgEAAQCp0vhi'
    // '006ed3824ee1946496faddd7abde731c1c2IADawTPNWer1xA5PeSnIDlYUmh0gnu35sjEiAJxf2/wp0Ya0dcYAAAAAEAArT8zLxSS8YgEAAQDEJLxi'
    // '0061af140d1d92848d4a4f315e62e37727bIAB+fGiaLhFQO3PXJPVULfFjNcwWEn6Jp0We13gBM2/eQYa0dcYAAAAAEABVr+ww+rO+XwEAAQD6s75f';

    const [channelName, setChannelName] = useState(channel_name);
    const [joinSucceed, setJoinSucceed] = useState(false);
    const [peerIds, setPeerIds] = useState([]);
    const [isMute, setIsMute] = useState(false);
    const [isSpeakerEnable, setIsSpeakerEnable] = useState(true);
    const rtcEngine = useRef(null);

    const initAgora = useCallback(async () => {
        rtcEngine.current = await RtcEngine.create(appId);

        await rtcEngine.current?.enableAudio();
        await rtcEngine.current?.enableLocalAudio(true);
        await rtcEngine.current?.muteLocalAudioStream(false);
        await rtcEngine.current?.setEnableSpeakerphone(true);
        //  await rtcEngine.current?.renewToken('7987898')
        // let temp = rtcEngine.current?.("token-privilege-will-expire", async function () {
        //     let newToken = await rtcEngine.current.renewToken(token);
        //     logToConsole({newToken})
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

            setPeerIds((peerIdsLocal) => {
                return peerIdsLocal.filter((id) => id !== uid);
            });
        });

        rtcEngine.current?.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed);

                setJoinSucceed(true);

                setPeerIds((peerIdsLocal) => {
                    return [...peerIdsLocal, uid];
                });
            },
        );

        rtcEngine.current?.addListener('Error', (error) => {
            console.log('Error', error);
        });
    }, []);

    const joinChannel = useCallback(async () => {
        if (peerIds.length === 5) {
            alert('Channel Maximun Limit Reached')
        } else {
            await rtcEngine.current?.joinChannel(token, channelName, null, 0);
        }

    }, [channelName]);

    const leaveChannel = useCallback(async () => {
        await rtcEngine.current?.leaveChannel();

        setPeerIds([]);
        setJoinSucceed(false);
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
    };
};
