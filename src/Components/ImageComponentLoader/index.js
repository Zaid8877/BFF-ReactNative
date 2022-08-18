import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from "react-native-linear-gradient";
import {StyleSheet, View} from "react-native";
import Images from "../../Utils/Images";
import colors from "../../Theme/Colors";
import FullWrapperLoader from "./FullWrapperLoader";
import {logToConsole} from "../../Configs/ReactotronConfig";

const ImageComponentLoader = ({
    containerStyle,
  source,
  style,
  resizeMode = 'contain',
  tintColor,
  ...rest
}) => {
  const [isImageLoad, setIsImageLoad]=useState(false)
  logToConsole({source})
  return (
      <View style={containerStyle}>
        <FastImage
            onLoadStart={() => setIsImageLoad(true)}
            onLoadEnd={() => setIsImageLoad(false)}
            style={[styles.image,containerStyle]}
            source={source?source:Images.placeholder}
            defaultSource={Images.placeholder}
        />
        <FullWrapperLoader loading={isImageLoad} color={colors.primary} />
      </View>
  );
};

const styles= StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    // width: SCREEN_WIDTH,
    // aspectRatio: 4 / 3,
    // zIndex: -1,
  }
})
export default ImageComponentLoader;
