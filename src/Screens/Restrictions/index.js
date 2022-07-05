import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Button from '../../Components/Button'
import { Metrics, Colors } from '../../Theme'
import { useState } from 'react'
import OptionItem from '../../Components/OptionItem'

const array = [
    {
        text: 'Image messaging',
        type: 'switch',
        enabled: false
    },
    {
        text: 'Add or remove contact',
        type: 'switch',
        enabled: true
    },
    {
        text: 'Contact invitations',
        type: 'switch',
        enabled: false
    },
    {
        text: 'Add or remove channels',
        type: 'switch',
        enabled: true
    },
    {
        text: 'Modify accounts',
        type: 'switch',
        enabled: true
    },
    {
        text: 'Text messaging',
        type: 'switch',
        enabled: false
    }
]


export default function Restrictions() {

    const [data, setData] = useState(array)

    return (
        <RootView>
            <Header title='Restrictions' />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: Metrics.defaultMargin, paddingBottom: 0 }}>
                    <Button text='Enable Lock' style={{ backgroundColor: Colors.lightGrey }} textStyle={{ color: Colors.grey}} />
                </View>
                <Text style={{ paddingLeft: Metrics.defaultMargin, marginBottom: 5 }}>Allow</Text>
                {data.map((item, index) => <OptionItem
                    item={item}
                    onPress={(item) => {
                        const arr = Array.from(data);
                        const ind = data.findIndex(val => val.text == item.text)
                        arr[ind].enabled = !arr[ind].enabled;
                        setData(arr)
                    }}
                    style={{
                        backgroundColor: index % 2 == 0 ? Colors.lightGrey : Colors.light,
                        borderBottomWidth: 0,
                        borderRadius: 10,
                        paddingLeft: Metrics.defaultMargin
                    }}
                />)}
            </ScrollView>
        </RootView>
    )
}
