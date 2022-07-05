import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../Theme'

export default function RadioButton({ isSelected, onSelect,id }) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={()=>onSelect(id)}>
            <View style={{
                width: 24,
                height: 24,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: Colors.primary,
                padding: 4
            }}>
                {isSelected ? <View style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                    backgroundColor: Colors.primary,
                }} /> : null}
            </View>
        </TouchableOpacity>
    )
}