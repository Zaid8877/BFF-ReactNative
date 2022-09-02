import "react-native-gesture-handler";
import * as React from "react";
import AuthLoading from "./src/Navigation"
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/Store'
import {RootSiblingParent} from 'react-native-root-siblings';
import {Alert, LogBox} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {useEffect} from "react";
import RNCallKeep from "react-native-callkeep";
import {logToConsole} from "./src/Configs/ReactotronConfig";
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from "@react-native-firebase/messaging";
import Navigator from "./src/Utils/Navigator";
import useUserState from "./src/CustomHooks/useUserState";

export default function App() {
    LogBox.ignoreAllLogs()
    useEffect(() => {
        /**
         * When a notification from FCM has triggered the application
         * to open from a quit state, this method will return a `RemoteMessage`
         * containing the notification data, or `null` if the app was opened via
         * another method.
         */
        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'getInitialNotification:' +
                        'Notification caused app to open from quit state',
                    );
                    console.log(remoteMessage);
                    alert(
                        'getInitialNotification: Notification caused app to open from quit state',
                    );
                }
            });

        /**
         * When the user presses a notification displayed via FCM, this listener
         * will be called if the app has opened from a background state.
         * See `getInitialNotification` to see how to watch for when a notification
         * opens the app from a quit state.
         */
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            if (remoteMessage) {
                console.log(
                    'onNotificationOpenedApp: ' +
                    'Notification caused app to open from background state',
                );
                console.log(remoteMessage);
                //
                // alert(
                //     'onNotificationOpenedApp: Notification caused app to open from background state',
                // );
                showAlertForCall(remoteMessage)
            }
        });

        /**
         * Set a message handler function which is called when the app is
         * in the background or terminated. In Android, a headless task is created,
         * allowing you to access the React Native environment to perform tasks
         * such as updating local storage, or sending a network request.
         */
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Message handled in the background!', remoteMessage);
            showAlertForCall(remoteMessage)

        });

        /**
         * When any FCM payload is received, the listener callback is called with
         * a `RemoteMessage`. Returns an unsubscribe function to stop listening
         * for new messages.
         */
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            // const userInfo=useUserState()
            // if (userInfo && userInfo.token) {
               showAlertForCall(remoteMessage)
                console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            // }
        });

        /**
         * Apps can subscribe to a topic, which allows the FCM server to send
         * targeted messages to only those devices subscribed to that topic.
         */

        return () => {
            unsubscribe;
            /**
             * Unsubscribe the device from a topic.
             */
            // messaging().unsubscribeFromTopic(TOPIC);
        };
    }, []);

    const showAlertForCall = (remoteMessage)=>{
        let data = remoteMessage.data
        Alert.alert("Call", data.title + " " + data.body,
            [
                {
                    text: "Answer",
                    style: "default",
                    onPress: () => {
                        let json = JSON.parse(data.json_data)
                        var param={isCallRecieved:true, channel_name:json.channel_name}
                        if(json.call_type === 'channel'){
                            let channel = json.channel
                            channel.participants = json.participants
                            param.channel=channel
                        }
                        else{
                            param.contact=json.contact
                        }
                        logToConsole(param)
                        Navigator.navigate("CallScreen", param)
                    }
                }, {
                text: "Reject",
                style: "default",
                onPress: () => {
                }
            },
            ]
        );
    }

    useEffect(() => {
        setUpCallKeep().then()
    }, [])
    const setUpCallKeep = async () => {
        try {
            const isAvailable = await RNCallKeep.isConnectionServiceAvailable()
            if (isAvailable) {
                logToConsole("Connection Service Available")
                await RNCallKeep.setup({
                    ios: {
                        appName: 'BFF',
                    },
                    android: {
                        alertTitle: 'Permissions required',
                        alertDescription: 'This application needs to access your phone accounts',
                        cancelButton: 'Cancel',
                        okButton: 'ok',
                    }
                });
                RNCallKeep.setAvailable(true);
            } else {
                logToConsole("Connection Service Not Available")
            }
        } catch (err) {
            console.error('initializeCallKeep error:', err.message);
        }

        //     // Add RNCallKit Events
        RNCallKeep.addEventListener('didReceiveStartCallAction', onNativeCall);
        RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
        RNCallKeep.addEventListener('endCall', onEndCallAction);
        RNCallKeep.addEventListener('didDisplayIncomingCall', onIncomingCallDisplayed);
        RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
        RNCallKeep.addEventListener('didPerformDTMFAction', onDTMF);
        // };
    }
    const onNativeCall = () => {
        logToConsole("onNativeCall")
    }
    const onAnswerCallAction = () => {
        logToConsole("onAnswerCallAction")
    }
    const onEndCallAction = () => {
        logToConsole("onEndCallAction")
    }
    const onIncomingCallDisplayed = () => {
        logToConsole("onIncomingCallDisplayed")
    }
    const onToggleMute = () => {
        logToConsole("onToggleMute")
    }
    const onDTMF = () => {
        logToConsole("onDTMF")
    }

    SplashScreen.hide()
    React.useEffect(() => {
        enableCrashlytics().then();
    }, []);

    const enableCrashlytics = async () => {
        await crashlytics()
            .setCrashlyticsCollectionEnabled(true)
            .then(() => {
                crashlytics().log('App mounted.');
            });
    };
    return (
        <RootSiblingParent>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AuthLoading/>
                </PersistGate>
            </Provider>
        </RootSiblingParent>
    );
}
