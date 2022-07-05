import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import OptionItem from '../../Components/OptionItem'
import { Metrics } from '../../Theme'
import Images from '../../Utils/Images'
import Navigator from '../../Utils/Navigator'

export default function Support() {
    return (
        <RootView>
            <Header title='Support' />
            <View style={styles.imageView}>
                <Image source={ Images.logo} style={styles.image} />
                <Text style={styles.text}>BFF Version 1.1.1</Text>
                <Text style={styles.text}>Copyrights at 2021-2031</Text>
            </View>
            <OptionItem item={{ text: 'Help', type: 'next' }} background style={{ marginBottom: Metrics.smallMargin }} />
            <OptionItem item={{ text: 'Report a Problem', type: 'next' }} background style={{ marginBottom: Metrics.smallMargin }} onPress={()=>Navigator.navigate('ReportProblem')}/>
            <OptionItem item={{ text: 'Third party Info', type: 'next' }} background style={{ marginBottom: Metrics.smallMargin }} onPress={()=>Navigator.navigate('ThirdPartyInfo')}/>
            <OptionItem item={{ text: 'Advanced Settings', type: 'next' }} background style={{ marginBottom: Metrics.smallMargin }} onPress={()=>Navigator.navigate('AdvancedSettings')}/>
        </RootView>
    )
}

const styles = StyleSheet.create({
    imageView: {
        alignItems: 'center',
        marginBottom: Metrics.largeMargin

    },
    image: {
        width: Metrics.screenWidth * 0.4,
        height: Metrics.screenWidth * 0.4,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 16,
        marginBottom: 5
    }
})