import "react-native-gesture-handler";
import * as React from "react";
import AuthLoading from "./src/Navigation"
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/Store'
import { RootSiblingParent } from 'react-native-root-siblings';
import {LogBox} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  LogBox.ignoreAllLogs()
  SplashScreen.hide()
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