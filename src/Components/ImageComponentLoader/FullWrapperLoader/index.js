import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

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

export default FullWrapperLoader;
