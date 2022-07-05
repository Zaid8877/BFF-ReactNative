import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import { Colors, Metrics } from '../../Theme';
import Images from '../../Utils/Images';

const data = [
  {
    image: Images.person2,
    title: 'Ralph Edwards',
    text: 'ralphedwards1',
    id: 0,
  },
];

export default function Recents() {

  return (
    <RootView statusBar={Colors.lightGrey} showCircle rightCircle>
      <Header
        secondary
        title="Recents"
        showAddIcon={false} 
      />
      <FlatList
        style={{ paddingTop: Metrics.defaultMargin }}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Item
            showIcon={true}
            item={item}
            style={{ backgroundColor: Colors.lightGrey }}
            
          />
        )}
      />
    </RootView>
  );
}
