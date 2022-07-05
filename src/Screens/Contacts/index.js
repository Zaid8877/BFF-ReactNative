import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import RootView from '../../Components/RootView';
import Header from '../../Components/Header';
import Item from '../../Components/Item';
import {Colors, Metrics} from '../../Theme';
import Images from '../../Utils/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../../Utils/Navigator';

const data = [
  {
    image: Images.soundWaves,
    title: 'Echo',
    text: 'Talk to me to test audio',
    id: 0,
    onPress:()=>Navigator.navigate('RecordAudio')
  },
];

export default function Contacts() {
  const renderItem = ({item}) => {
    const {title, text, image,onPress} = item;
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={[styles.item]}>
          <View style={styles.imageView}>
            <Image source={image} style={styles.image} />

            <View style={styles.iconView}>
              <Icon name="check" color="white" />
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={[styles.heading]}>{title}</Text>
            <Text style={[styles.text]}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <RootView statusBar={Colors.lightGrey}>
      <Header secondary title="Contacts" text='No contacts, tap "+" to add' onPressRight={()=>Navigator.navigate('Connect')}/>
      <FlatList
        style={{paddingTop: Metrics.defaultMargin}}
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </RootView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.secondary,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.defaultMargin,
    marginBottom: Metrics.defaultMargin,
    overflow: 'hidden',
  },
  imageView: {
    width: Metrics.screenWidth * 0.15,
    height: Metrics.screenWidth * 0.15,
    borderRadius: Metrics.screenWidth * 0.15,
    backgroundColor: Colors.white,
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    tintColor: Colors.primary,
  },
  iconView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 1,
    zIndex: 10,
  },
  textView: {
    marginLeft: Metrics.defaultMargin,
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
