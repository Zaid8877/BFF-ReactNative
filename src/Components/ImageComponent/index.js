import React from 'react';
import FastImage from 'react-native-fast-image';

const ImageComponent = ({
  source,
  style,
  resizeMode = 'contain',
  tintColor,
  ...rest
}) => {
  return (
    <FastImage
      {...rest}
      source={source}
      resizeMode={resizeMode}
      style={style}
      tintColor={tintColor || style?.tintColor}
    />
  );
};
export default ImageComponent;
