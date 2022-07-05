import {ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import { useState } from 'react'
import OptionItem from '../../Components/OptionItem'

const array = [
    {
        text: 'Alert Volume',
        type:'switch',
        enabled: false
    },
    {
        text: 'Ready to Send',
        type:'switch',
        enabled: true
    },
    {
        text: 'Talk button up',
        type:'switch',
        enabled: false
    },
    {
        text: 'Incoming Message',
        type:'switch',
        enabled: true
    },
    {
        text: 'Error',
        type:'switch',
        enabled: true
    },
    {
        text: 'Incoming Alert',
        type:'switch',
        enabled: false
    },
    {
        text: 'Channel Alert',
        type:'switch',
        enabled: true
    },
    {
        text: 'Connection Lost',
        type:'switch',
        enabled: false
    },
    {
        text: 'Connection Restored',
        type:'switch',
        enabled: true
    },
    {
        text: 'Sign in from a different device',
        type:'switch',
        enabled: true
    },
    {
        text: 'Image messaging',
        type:'switch',
        enabled: true
    },
    {
        text: 'Location messaging',
        type:'switch',
        enabled: true
    },
]


export default function AlertTones() {

    const [data, setData] = useState(array)

    return (
        <RootView>
            <Header title='Alert Tones' />
            <ScrollView style={{ flex: 1 }}>
                {data.map(item => <OptionItem item={item} onPress={(item) => {
                    const arr = Array.from(data);
                    const ind = data.findIndex(val => val.text == item.text)
                    arr[ind].enabled = !arr[ind].enabled;
                    setData(arr)
                }} />)}
            </ScrollView>
        </RootView>
    )
}
