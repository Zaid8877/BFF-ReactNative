import { View, Text } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Navigator from '../../Utils/Navigator'
import { Colors, Metrics } from '../../Theme'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import colors from '../../Theme/Colors'

export default function QRScanner() {
  return (
    <RootView statusBar={Colors.lightGrey}>
      <Header secondary title='Scan' showAddIcon={false} leftIcon='chevron-left' onPressLeft={() => Navigator.goBack()} />

      <QRCodeScanner
        onRead={(e) => {
          alert("CODE SCANNED:", e.data)
        }}
        showMarker={true}
        markerStyle={{ borderColor: colors.primary }}
        cameraStyle={{ width: Metrics.screenWidth * 0.9, height: Metrics.screenWidth * 0.9, alignSelf: 'center' }}
      />
    </RootView>
  )
}