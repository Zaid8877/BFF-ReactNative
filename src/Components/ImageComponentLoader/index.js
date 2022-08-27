import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from "react-native-linear-gradient";
import {Image, StyleSheet, View} from "react-native";
import Images from "../../Utils/Images";
import colors from "../../Theme/Colors";
import FullWrapperLoader from "./FullWrapperLoader";
import {logToConsole} from "../../Configs/ReactotronConfig";

const ImageComponentLoader = (
    {
        containerStyle,
        inOnline = true,
        source,
        style,
        resizeMode = 'contain',
        tintColor,
        isProfile = true,
        ...rest
    }
) => {
    const [isImageLoad, setIsImageLoad] = useState(false)
    logToConsole({inOnline})
    logToConsole({source})
    const getSourceImage = () => {
        const url = "https://bff.appnoit.com/uploads/" + source
        logToConsole(url)
        return {uri:url}
    }
    return (
        <View style={containerStyle}>
            {!inOnline && <Image source={{uri:source.data}} style={[styles.image, containerStyle]} defaultSource={Images.placeholder}/>}

                {inOnline && <FastImage
                onLoadStart={() => setIsImageLoad(true)}
                onLoadEnd={() => setIsImageLoad(false)}
                style={[styles.image, containerStyle]}
                source={source ? getSourceImage(): Images.placeholder}
                defaultSource={Images.placeholder}
            />
            }
            <FullWrapperLoader loading={isImageLoad} color={colors.primary}/>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        // width: SCREEN_WIDTH,
        // aspectRatio: 4 / 3,
        // zIndex: -1,
    }
})
export default ImageComponentLoader;
