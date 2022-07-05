import { View, Text } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Input from '../../Components/Input'
import { Metrics } from '../../Theme'
import Button from '../../Components/Button'

export default function ReportProblem() {
    return (
        <RootView>
            <Header title='Report a Problem' />
            <View style={{ marginHorizontal: Metrics.defaultMargin }}>
                <Input
                    style={{ height: Metrics.screenHeight * 0.2, borderRadius: 10, paddingTop: 15 }}
                    placeholder='Problem description'
                    multiline={true}
                />
                <Text style={{ marginBottom: Metrics.largeMargin }}>Describe your problem. Please include your email address if you'd like a reply.</Text>
                <Button secondary={true} text='Support FAQ' />
            </View>
        </RootView>
    )
}