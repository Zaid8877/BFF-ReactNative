import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme'

export default function Heading({ text }) {
    return (
        <View>
            <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                color:Colors.textDark
            }}>{text}</Text>
        </View>
    )
}