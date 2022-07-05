import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import { Colors, Metrics } from '../../Theme';
import Images from '../../Utils/Images';

const array = [
  {
    image: Images.person2,
    title: 'Ralph Edwards',
    text: 'ralphedwards1',
    id: 0,
  },
  {
    image: Images.person,
    title: 'Emma Watson',
    text: 'emma',
    id: 1,
  },
];

export default function Accounts() {
  const [data, setData] = useState(array);
  const [index, selectIndex] = useState(0);
  return (
    <RootView statusBar={Colors.lightGrey}>
      <Header
        secondary
        title="Accounts"
        showAddIcon={false} 
      />
      <FlatList
        style={{ paddingTop: Metrics.defaultMargin }}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={id => {
              selectIndex(id);
            }}
            selected={item.id == index}
          />
        )}
      />
    </RootView>
  );
}
