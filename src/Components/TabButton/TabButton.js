import {Image, Platform, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import Colors from "../../Theme/Colors";

const TabButton = ({containerStyle = {},textContainerStyle={}, name, isSelected, onItemPress}) => {
  return (
    // <View style={{flex: 1, flexDirection: 'column'}}>
    <TouchableOpacity
      style={[styles.itemContainer, containerStyle]}
      onPress={onItemPress}>
      <View
        style={[
          isSelected
            ? styles.SelectedItem
            : styles.NoteSelectedItem,
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          },
          textContainerStyle,
        ]}>
        <Text
          style={
            isSelected
              ? styles.textSelected
              : styles.textNotSelected
          }>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
    // {/* <View style={{ width: '100%', height: 2, backgroundColor: colors.bgColor_grey }} /> */}
    // </View>
  );
};
const styles= StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },

    SelectedItem: {
        flex: 1,
        borderRadius: 5,
        borderColor:Colors.blue,
        borderWidth: 1,
        backgroundColor: Colors.blue,
    },

    NoteSelectedItem: {
        flex: 1,
        borderRadius: 5,
        borderColor: Colors.transparent,
        borderWidth: 1,
        backgroundColor: Colors.transparent,
    },
    textSelected: {
        fontSize: 14,
        color: Colors.white,
        marginTop: 10,
        marginBottom: 10,
    },

    itemContainer: {
        padding: 4,
    },
    textNotSelected: {
        fontSize: 14,
        color: Colors.black,
        marginTop: 10,
        marginBottom: 10,
    },
})

export default React.memo(TabButton);
