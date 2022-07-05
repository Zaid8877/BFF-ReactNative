/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Colors, Metrics } from '../../Theme';
import Navigator from '../../Utils/Navigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({
    title = 'Home',
    titleStyle = {},
    showRight = false,
    rightView = null,
    secondary = false,
    leftIcon = secondary ? 'menu' : 'chevron-left',
    onPressLeft = () => secondary ? Navigator.openDrawer() : Navigator.goBack(),
    onPressRight = () => { Navigator.navigate('Connect')},
    text,
    showAddIcon = true,
    showContent = true,
    style
}) {
    if (secondary) {
        return (
            <View style={[styles.secondaryView, style]}>
                <StatusBar backgroundColor={Colors.lightGrey} />
                <View style={styles.iconContainer}>
                    <Icon name={leftIcon} size={32} onPress={onPressLeft} />
                    {showAddIcon ?
                        <TouchableOpacity activeOpacity={0.9} onPress={onPressRight} style={styles.iconView}>
                            <Icon name='plus' size={32} color='white' />
                        </TouchableOpacity>
                        : null}
                </View>
                {showContent ? <><Text style={styles.heading}>{title}</Text>
                    <Text style={{ fontSize: 16, color: Colors.textDark }}>{text ? text : ''}</Text></> : null}
            </View>
        )
    }
    else {
        return (
            <View style={[styles.container, style]}>
                <View style={styles.sideView}>
                    <Icon name={leftIcon} style={styles.icon} onPress={onPressLeft} />
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.sideView}>
                    {showRight ? <Text onPress={onPressRight} style={styles.skip}>Skip</Text> : null}
                </View>
            </View>
        );
    }
}
