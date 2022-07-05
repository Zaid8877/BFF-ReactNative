import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import RadioButton from '../../Components/RadioButton'
import { useState } from 'react'
import { Metrics } from '../../Theme'

const data = [
    {
        id: 1,
        name: 'English',
    },
    {
        id: 2,
        name: 'Arabic'
    },
    {
        id: 3,
        name: 'Chinese',
    },
    {
        id: 4,
        name: 'Danish'
    },
    {
        id: 5,
        name: 'Dutch',
    },
    {
        id: 6,
        name: 'French'
    },
]

export default function Languages() {
    const [index, setIndex] = useState(1)

    const renderItem = ({ name, id }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{name}</Text>
                <RadioButton id={id} isSelected={index == id} onSelect={(ind) => setIndex(ind)} />

            </View>
        )
    }
    return (
        <RootView>
            <Header title='Language' />
            {data.map(item => renderItem(item))}
        </RootView>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginHorizontal: Metrics.largeMargin,
        paddingVertical: Metrics.smallMargin,
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        paddingRight: Metrics.smallMargin,
        alignItems:'center'

    },
    text: {
        fontSize: 16

    }
})