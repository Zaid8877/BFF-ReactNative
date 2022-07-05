import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import OptionItem from '../../Components/OptionItem'
import { Colors, Metrics } from '../../Theme'
import Slider from '@react-native-community/slider';

export default function AdvancedSettings() {
    return (
        <RootView>
            <Header title='Advanced Settings' />
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <Text style={styles.text}>Call Setup</Text>
                    <OptionItem item={{ text: 'Message Delivery', type: 'switch' }} background />
                    <OptionItem item={{ text: 'Call pre-setup', type: 'switch' }} background style={{ backgroundColor: 'white' }} />
                </View>
                <View>
                    <Text style={styles.text}>Networking (mobile)</Text>
                    <OptionItem item={{ text: 'Use TCP only', type: 'switch' }} background />
                    <View style={styles.sliderView}>
                        <Text style={styles.optionText}>Keep alive internal</Text>
                        <Slider
                            style={{ width: Metrics.screenWidth * 0.8, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={Colors.primary}
                            maximumTrackTintColor={Colors.lightGrey}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Networking (Wifi)</Text>
                    <OptionItem item={{ text: 'Use TCP only', type: 'switch' }} background />
                    <View style={styles.sliderView}>
                        <Text style={styles.optionText}>Keep alive internal</Text>
                        <Slider
                            style={{ width: Metrics.screenWidth * 0.8, height: 60 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor={Colors.primary}
                            maximumTrackTintColor={Colors.lightGrey}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Security</Text>
                    <OptionItem item={{ text: 'Enable TLS', type: 'switch' }} background />

                </View>
            </ScrollView>
        </RootView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        marginLeft: Metrics.defaultMargin,
        marginBottom: Metrics.smallMargin,
        marginTop: Metrics.defaultMargin
    },
    sliderView: {
        marginHorizontal: Metrics.defaultMargin,
        paddingVertical: Metrics.smallMargin,
        paddingHorizontal: Metrics.defaultMargin,
        paddingBottom: 0
    },
    optionText: {
        fontSize: 16,
        marginRight: 10
    }
})