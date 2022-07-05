import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Button from '../../Components/Button'
import Navigator from '../../Utils/Navigator'
import { Colors, Metrics } from '../../Theme'
import Images from '../../Utils/Images'

export default function Connect() {
    return (
        <RootView statusBar={Colors.lightGrey}>
            <Header secondary title='Connect' showAddIcon={false} leftIcon='chevron-left' onPressLeft={() => Navigator.goBack()} />
            <View style={{ padding: Metrics.defaultMargin }}>
                <Image source={Images.qr} style={styles.qr} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: Colors.primary }}>Connect</Text>
                    <Image source={Images.bff} style={styles.bff} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Metrics.largeMargin }}>
                    <View style={styles.divider} />
                    <Text> or </Text>
                    <View style={styles.divider} />
                </View>
                <Button text='Scan' icon='camera' onPress={()=>Navigator.navigate('QrScanner')}/>
            </View>
        </RootView>
    )
}

const styles = StyleSheet.create({
    qr: {
        width: Metrics.screenHeight * 0.28,
        height:Metrics.screenHeight * 0.36,
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