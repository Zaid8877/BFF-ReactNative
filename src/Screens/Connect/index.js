import {View, Text, Image, StyleSheet} from 'react-native'
import React, {useEffect, useState} from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Button from '../../Components/Button'
import Navigator from '../../Utils/Navigator'
import {Colors, Metrics} from '../../Theme'
import Images from '../../Utils/Images'
import QRCode from 'react-native-qrcode-svg';
import useUserState from "../../CustomHooks/useUserState";
import {logToConsole} from "../../Configs/ReactotronConfig";

export default function Connect() {
    const [qrvalue, setQrvalue] = useState('');
    const userInfo = useUserState()
    useEffect(() => {
        generateQRCode()
    }, [])
    const generateQRCode = () => {
        let userValue=JSON.stringify({name: userInfo.name, id: userInfo.id})
        logToConsole({userValue})
        setQrvalue(userValue)
    }
    return (
        <RootView statusBar={Colors.lightGrey}>
            <Header secondary title='Connect' showAddIcon={false} leftIcon='chevron-left'
                    onPressLeft={() => Navigator.goBack()}/>
            <View style={{padding: Metrics.defaultMargin}}>
                <View style={[styles.qr, {alignSelf: "center", alignItems:'center'}]}>
                <QRCode
                    size={Metrics.screenHeight * 0.28}
                    //QR code value
                    value={qrvalue ? qrvalue : 'NA'}
                    logo={Images.logo}
                    logoSize={40}

                    />
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={{fontSize: 28, fontWeight: 'bold', color: Colors.primary}}>Connect</Text>
                    <Image source={Images.bff} style={styles.bff}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: Metrics.largeMargin}}>
                    <View style={styles.divider}/>
                    <Text> or </Text>
                    <View style={styles.divider}/>
                </View>
                <Button text='Scan' icon='camera' onPress={() => Navigator.navigate('QrScanner')}/>
            </View>
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
