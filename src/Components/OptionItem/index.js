import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Metrics, Colors } from '../../Theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from 'react-native-switch';

export default function OptionItem({ item, style, background, onPress = () => { } }) {
    const { text, enabled = true, type, buttonText } = item;

    renderItem = () => {
        switch (type) {
            case 'switch':
                return (
                    <Switch
                        value={enabled}
                        onValueChange={() => onPress(item)}
                        renderActiveText={false}
                        renderInActiveText={false}
                        circleActiveColor={Colors.light}
                        circleInActiveColor={Colors.light}
                        backgroundActive={Colors.primary}
                        backgroundInactive={Colors.grey}
                        circleBorderWidth={2}
                        innerCircleStyle={{ borderColor: enabled ? Colors.primary : Colors.grey }}
                    />
                );
            case 'button':
                return (
                    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </View>
                    </TouchableOpacity>
                )
            case 'next':
                return (
                    <Icon name='chevron-right' style={styles.icon} />
                )
        }
    }


    return (
        <TouchableOpacity disabled={type !== 'next'} onPress={onPress} activeOpacity={0.9}>
            <View style={[styles.item, background ? styles.background : null, style]}>
                <Text style={styles.text}>
                    {text}
                </Text>
                <View style={styles.sideView}>
                    {renderItem()}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginHorizontal: Metrics.defaultMargin,
        paddingVertical: Metrics.smallMargin,
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        paddingRight: Metrics.smallMargin,
        alignItems: 'center',
        paddingLeft: 5,
        borderColor: Colors.darkGrey
    },
    background: {
        backgroundColor: Colors.lightGrey,
        borderBottomWidth: 0,
        borderRadius: 10,
        paddingLeft: Metrics.defaultMargin

    },
    text: {
        fontSize: 16,
        flex: 1,
        marginRight: 10

    },
    button: {
        width: 60,
        backgroundColor: '#bde0fd',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#3997e5',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 28
    },
    sideView: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})