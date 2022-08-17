import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../../Utils/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../Theme';
import {screenWidth} from '../../Theme/Metrics'

export default function Item({item, onPress=()=>{},selected=false,style,showIcon}) {
  const {channel_name, participants, image, id} = item;
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(id)}>
      <View
        style={[
          styles.item,
          {backgroundColor: selected ? Colors.primary : 'white'},
          style
        ]}>
        {selected ? <View style={styles.triangle} /> : null}
        <View style={[styles.imageView, !image? {justifyContent: 'center'}: {padding: 12}]}>
          {image && <Image source={image} style={styles.image} />}

          {!image && <Text style={{ textAlign: 'center', color: Colors.black, fontSize: 36, fontWeight: 'bold' }}>{channel_name.charAt(0).toUpperCase()}</Text>
          }
          {selected || showIcon ? (
            <View style={styles.iconView}>
              <Icon name="check" color="white" />
            </View>
          ) : null}
        </View>
        <View style={styles.textView}>
          <Text
            style={[
              styles.heading,
              {color: selected ? 'white' : Colors.textDark},
            ]}>
            {channel_name}
          </Text>
          <Text
            style={[
              styles.text,
              {color: selected ? 'white' : Colors.textDark},
            ]}>
            {participants}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.defaultMargin,
    marginBottom: Metrics.defaultMargin,
    height: parseInt(Metrics.screenHeight * 0.12),
    width: parseInt(Metrics.screenWidth * 0.9),
    overflow: 'hidden',
  },
  imageView: {
    width: Metrics.screenWidth * 0.15,
    height: Metrics.screenWidth * 0.15,
    borderRadius: Metrics.screenWidth * 0.15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
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
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: parseInt(Metrics.screenWidth * 0.9),
    borderTopWidth: parseInt(Metrics.screenHeight * 0.12),
    borderRightColor: 'transparent',
    borderTopColor: Colors.third,
    borderRadius: 20,
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
});
