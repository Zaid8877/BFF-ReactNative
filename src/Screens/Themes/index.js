import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import Images from '../../Utils/Images'
import { Colors, Metrics } from '../../Theme'

export default function Themes() {
    return (
        <RootView>
            <Header title='Themes' />
            <View style={{ marginHorizontal: Metrics.defaultMargin }}>
                <Text style={{ marginBottom: 5 }}>My Buttons</Text>
                <View style={styles.item}>
                    <Image source={Images.lightMode} style={styles.image} />
                    <Text style={styles.text}>Light</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.item}>
                    <Image source={Images.darkMode} style={styles.image} />
                    <Text style={styles.text}>Dark</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.item}>
                    <Image source={Images.lightDark} style={styles.image} />
                    <Text style={styles.text}>Match system preferences</Text>
                </View>
                <View style={styles.line} />
            </View>
        </RootView>
    )
}

const styles = StyleSheet.create({
    item:
    {
        backgroundColor: Colors.lightGrey,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10

    },
    image: {
        width: 40,
        height: 40,
        backgroundColor: Colors.light,
        borderRadius: 10,
        marginRight: 20

    },
    text: {
        fontWeight: 'bold',
        fontSize: 16

    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.lightGrey,
        marginVertical: 5

    }
})