import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Metrics } from '../../Theme'
import Button from '../../Components/Button'

export default function PushToTalk() {
    return (
        <RootView>
            <Header title='Push to Talk' />
            <View style={styles.container}>
                <Text style={{ marginBottom: 10 }}>My Buttons</Text>
                <View style={styles.view}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='microphone-outline' size={24} />
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Screen Button</Text>
                    </View>
                    <Icon name='chevron-right' size={24} />
                </View>
                <Text style={{ marginBottom: 10, marginTop: 20 }}>Other Buttons</Text>
                <Button secondary={true} text='Add New Device' />
            </View>
        </RootView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Metrics.defaultMargin,
        paddingTop:Metrics.defaultMargin
    },
    view: {
        backgroundColor: Colors.lightGrey,
        flexDirection: 'row',
        padding: Metrics.defaultMargin,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})