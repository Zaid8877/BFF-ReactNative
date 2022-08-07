import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../../Utils/Images';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Metrics} from '../../Theme';

export default function NoRecordFound({message}) {
  return (
    <View styles={styles.container}>
      <Image source={Images.logo} style={styles.image} />
      <Text style={styles.noRecordFound}>{message}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    paddingVertical:Metrics.largeMargin,
    paddingHorizontal:Metrics.largeMargin
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.2,
    alignSelf: 'center',
    resizeMode:'contain',
  },
  noRecordFound: {
    marginVertical: Metrics.smallMargin,
    textAlign:'center',
    fontSize: 16
  },
})
