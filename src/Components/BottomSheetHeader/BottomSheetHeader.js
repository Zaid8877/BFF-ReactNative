import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import Images from "../../Utils/Images";
import colors from "../../Theme/Colors";
import {Metrics} from "../../Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BottomSheetHeader = ({
  backPressIcon = 'chevron-left',
  backIconStyle,
  title,
  backButton = true,
  rightView,
  onBackPress,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.parent, style]}>
      {backButton && (
              <Icon name={backPressIcon} size={32} onPress={onBackPress} />
      )}
      <Text
        value={title}
        font={'medium'}
        style={[styles.titleStyle, titleStyle]}
      />
      {typeof rightView === 'function' && <>{rightView()}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    height:50,
    width: '95%',
    alignSelf: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    paddingStart: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 30,
    height: 30,
    // top: getMetricsVertical(isIos ? 10 : 15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    start: 5,
  },
  titleStyle: {
    marginStart: 30,
    textAlign: 'left',
    width: '80%',
    fontSize: Metrics.largeFont,
  },
});
export default BottomSheetHeader;
