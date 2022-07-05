import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Metrics } from '../../Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Input({style,icon,...props}) {
    return (
        <View>
            <TextInput
                style={[styles.input,{paddingRight:icon?Metrics.ratio(36):Metrics.smallMargin},style]}
                placeholderTextColor={Colors.grey}
                textAlignVertical='center'
                {...props}
            />
            {icon ? <Icon name={icon} style={styles.icon}/> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    input: {
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: Metrics.smallMargin,
        borderRadius: 5,
        marginBottom: Metrics.defaultMargin,
        height:Metrics.screenHeight*0.06
    },
    icon: {
        position: 'absolute',
        right:Metrics.ratio(10),
        fontSize:Metrics.ratio(20),
        color:Colors.darkGrey,
        top:Metrics.ratio(12)

    }
})