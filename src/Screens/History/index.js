import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import OptionItem from '../../Components/OptionItem'

const array = [
  {
    text: 'Delete messages',
    type: 'next',
  },
  {
    text: "Save sent images to 'Sent'",
    type: 'switch',
    enabled: false
  },
  {
    text: 'History',
    type: 'button',
    buttonText: 'Delete'
  },
  {
    text: 'Image history',
    type: 'button',
    buttonText: 'Delete'
  }
]

export default function History() {

  const [data, setData] = useState(array)

  return (
    <RootView>
      <Header title='History' />
      <ScrollView>
        <OptionItem item={data[0]} />
        <OptionItem item={data[1]} onPress={() => {
          const arr = Array.from(data)
          arr[1].enabled = !arr[1].enabled;
          setData(arr)
        }} />
        <OptionItem item={data[2]} />
        <OptionItem item={data[3]} style={{ borderBottomWidth: 0 }} />
      </ScrollView>
    </RootView>
  )
}