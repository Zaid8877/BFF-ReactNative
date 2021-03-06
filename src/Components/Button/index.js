import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Metrics } from '../../Theme'
import Icon from 'react-native-vector-icons/Feather'

export default function Button({ text, style, textStyle, secondary,onPress,icon }) {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={[styles.container, { backgroundColor: secondary ? Colors.lightGrey : Colors.primary }, style]}>
                <Text style={[styles.text, { color: secondary ? Colors.primary : Colors.textLight }, textStyle]}>{text}</Text>
                <Icon name={icon} color='white' size={18} style={{marginLeft:10}}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        marginBottom: Metrics.defaultMargin,
        height:Metrics.screenHeight*0.06,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
        
    },
    text: {
        color: Colors.textLight,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    }
})