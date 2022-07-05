import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';;
import React from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Images from '../../Utils/Images';
import {Colors, Metrics} from '../../Theme';import Navigator from '../../Utils/Navigator';
;

const data = [
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
  {
    name: 'John Wick',
    text: 'Lorum ipsum is a simple dummy text. Lorum ipsum is a simple dummy text.',
    image: Images.person,
  },
];;

export default function Messaging() {
  const renderItem = ({item}) => {
    const {image, text, name} = item;
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={()=>Navigator.navigate('Chat')}>
        <View style={styles.item}>
        <View style={styles.imageView}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.textView}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <Text numberOfLines={2} style={styles.text}>
            {text}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  return (
    <RootView>
      <Header title="Messaging" />
      <FlatList
        data={data}
        renderItem={renderItem}
        key={Math.random()}
        ItemSeparatorComponent={() => <View style={styles.line} />}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: Metrics.defaultMargin,
    paddingVertical: Metrics.defaultMargin,
    backgroundColor: Colors.lightGrey,
    borderRadius: 20,
    paddingHorizontal: Metrics.smallMargin,
    alignItems: 'center',
  },
  imageView: {
    width: Metrics.screenWidth * 0.18,
    height: Metrics.screenWidth * 0.18,
    overflow: 'hidden',
    borderRadius: Metrics.screenWidth * 0.1,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  textView: {
    flex: 1,
    marginLeft: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.lightGrey,
    marginHorizontal: Metrics.smallMargin,
    marginVertical: 5,
  },
});
