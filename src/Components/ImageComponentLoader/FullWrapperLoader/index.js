import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from "../../../Theme/Colors";

export const FullWrapperLoader = ({loading, color}) => {
  if (!loading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'small'} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {},
});

export default FullWrapperLoader;
