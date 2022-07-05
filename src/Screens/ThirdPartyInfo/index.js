import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import RootView from '../../Components/RootView'
import Header from '../../Components/Header'
import { Colors, Metrics } from '../../Theme'

export default function ThirdPartyInfo() {
    return (
        <RootView>
            <Header title='Third Party Info' />
            <ScrollView style={{flex:1}}>
            <View style={{ backgroundColor: Colors.lightGrey, marginHorizontal: Metrics.defaultMargin, padding: Metrics.defaultMargin, borderRadius: 10 }}>
                <Text>Lorem ipsum dolor sit amet. Et ullam iusto aut officia sapiente aut dolores velit id sunt nihil rem praesentium corporis vel quisquam quia. Eos reiciendis alias ex asperiores quae eos sapiente praesentium et commodi placeat. {'\n\n'}Et delectus autem hic nobis aliquid ab maiores voluptas id quas veniam. At quia aperiam ut voluptatem dolores et facilis modi aut reiciendis maxime aut perspiciatis amet. {'\n\n'}Aut fugiat reiciendis ab necessitatibus molestiae aut quisquam optio aut commodi aperiam id doloremque placeat cum ullam placeat. Qui similique omnis et reiciendis maxime qui minima iure in quia modi ea aspernatur consequatur id autem incidunt id libero rerum.{'\n\n'}Non galisum animi ea laudantium quia est ratione consequuntur sed reprehenderit repudiandae cum dolorem nemo non libero saepe.

                    Eum autem quas ut obcaecati odit in minima velit eos odio perferendis ut amet consequatur sit perspiciatis temporibus nam velit velit. {'\n\n'}Aut rerum accusamus qui voluptas odio a vitae saepe est ullam consectetur sit praesentium. {'\n\n'}Est esse atque ea dolore aspernatur vel inventore minima rem libero reiciendis cum sint possimus.</Text>
            </View>
            </ScrollView>
        </RootView>
    )
}