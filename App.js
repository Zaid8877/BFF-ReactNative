import "react-native-gesture-handler";
import * as React from "react";
import AuthLoading from "./src/Navigation"
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/Store'
import { RootSiblingParent } from 'react-native-root-siblings';
import {LogBox} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {useEffect} from "react";
import RNCallKeep from "react-native-callkeep";
import {logToConsole} from "./src/Configs/ReactotronConfig";
import crashlytics from '@react-native-firebase/crashlytics';

export default function App() {
  LogBox.ignoreAllLogs()
    useEffect(()=>{
        setUpCallKeep().then()
    },[])
    const setUpCallKeep= async ()=>{
        try {
            const isAvailable = await RNCallKeep.isConnectionServiceAvailable()
            if(isAvailable){
                logToConsole("Connection Service Not Available")
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
            }
            else{
                logToConsole("Connection Service Not Available")
            }
        } catch (err) {
            console.error('initializeCallKeep error:', err.message);
        }

        //     // Add RNCallKit Events
        //     RNCallKeep.addEventListener('didReceiveStartCallAction', onNativeCall);
        //     RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
        //     RNCallKeep.addEventListener('endCall', onEndCallAction);
        //     RNCallKeep.addEventListener('didDisplayIncomingCall', onIncomingCallDisplayed);
        //     RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
        //     RNCallKeep.addEventListener('didPerformDTMFAction', onDTMF);
        // };
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
          <AuthLoading />
        </PersistGate>
      </Provider>
    </RootSiblingParent>
  );
}
