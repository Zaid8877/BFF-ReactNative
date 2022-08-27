import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import colors from "../../Theme/Colors";
import {Colors, Metrics} from "../../Theme";
import SelectedContactsBottomSheet from "../SelectContactsBottomSheet";

import ImageComponentLoader from "../ImageComponentLoader";
import Images from "../../Utils/Images";
import {logToConsole} from "../../Configs/ReactotronConfig";

const CallContactsItem = ({item, isSelected, peer = '', isMute = false,}) => {
    logToConsole({isMute})
    logToConsole({peer})
    const {name, email, profile_pic: image} = item;

    return (
        <View style={[styles.item, {alignItems: 'center', alignSelf: 'center', justifyContents: 'center'}]}>

            <View style={[styles.imageView, !image ? {justifyContent: 'center'} : {padding: 0}]}>
                {image && <ImageComponentLoader source={image} containerStyle={styles.imageView}/>}
                {!image && <Text style={{
                    textAlign: 'center',
                    color: Colors.black,
                    fontSize: 36,
                    fontWeight: 'bold'
                }}>{name && name.charAt(0).toUpperCase()}</Text>
                }
                {isMute &&
                    <View style={[styles.iconView, {
                        borderRadius: 40,
                        padding: 5,
                        backgroundColor: colors.black
                    }]}>
                        <Image source={Images.mic} style={[{height: 20, width: 20, tintColor: colors.white}]}/>
                    </View>
                }
            </View>
            <Text style={[styles.heading]}>{name}</Text>
            {isSelected &&
                <View style={styles.selectedIconView}>
                    <Icon name="check" color="white"/>
                </View>}
        </View>)
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.secondary,
        borderRadius: 20,
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: Metrics.defaultMargin,
        marginBottom: Metrics.defaultMargin,
    },
    imageView: {
        width: Metrics.screenWidth * 0.25,
        height: Metrics.screenWidth * 0.25,
        borderRadius: Metrics.screenWidth * 0.25,
        backgroundColor: colors.white,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: Metrics.screenWidth * 0.25,
        tintColor: colors.primary,
    },
    iconView: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textView: {
        marginLeft: Metrics.defaultMargin,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    selectedIconView: {
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
});


export default React.memo(CallContactsItem);
