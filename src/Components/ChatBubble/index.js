import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';

export default function ChatBubble({item}) {
  const {userId, image, text} = item;
  return (
    <View style={styles.container}>
      <View style={[styles.row,{alignSelf:userId==1?'flex-end':'flex-start'}]}>
        {userId !== 1 ? (
          <Image source={image} style={styles.profileImage} />
        ) : null}
        <View
          style={[
            styles.bubble,
            userId === 1 ? styles.rightBubble : styles.leftBubble,
          ]}>
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
        {userId == 1 ? (
          <Image source={image} style={styles.profileImage} />
        ) : null}
      </View>
    </View>
  );
}
