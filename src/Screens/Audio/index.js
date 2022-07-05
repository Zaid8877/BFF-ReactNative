import {  ScrollView } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import { useState } from 'react'
import OptionItem from '../../Components/OptionItem'

const array = [
    {
        text: 'Record over bluetooth',
        type:'switch',
        enabled: false
    },
    {
        text: 'Play as phone call with bluetooth',
        type:'switch',
        enabled: true
    },
    {
        text: 'Mix with other audio',
        type:'switch',
        enabled: false
    },
    {
        text: 'Noise suppression',
        type:'switch',
        enabled: true
    },
    {
        text: 'Amplification',
        type:'switch',
        enabled: true
    }
]

export default function Audio() {

    const [data, setData] = useState(array)

    return (
        <RootView>
            <Header title='Audio' />
            <ScrollView style={{ flex: 1 }}>
                {data.map(item => {
                    return <OptionItem 
                    item={item} 
                    onPress={(item) => {
                        const arr = Array.from(data);
                        const ind = data.findIndex(val => val.text == item.text)
                        arr[ind].enabled = !arr[ind].enabled;
                        setData(arr)
                    }} 
                    />
                })}
            </ScrollView>
        </RootView>
    )
}