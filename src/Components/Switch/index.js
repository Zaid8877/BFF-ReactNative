import { View, Text, Switch } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme'

export default function CustomSwitch({ enabled, onChange ,item}) {
    return (
        <Switch
            trackColor={enabled ? 'green' : Colors.lightGrey}
            ios_backgroundColor={enabled ? 'green' : Colors.lightGrey}
            value={enabled}
            onValueChange={()=>onChange(item)}
        />
    )
}