import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import colors from "../../Theme/Colors";
import {Metrics} from "../../Theme";
import SelectedContactsBottomSheet from "../SelectContactsBottomSheet";

const ContactsItem = ({item, isSelected, onPress})=>{
    const {name, email, image} = item;

    return (<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={[styles.item,{alignItems: 'center',  alignSelf:'center', justifyContents:'center'}]}>
            <View style={styles.imageView}>
                <Image source={image} style={styles.image}/>

                <View style={styles.iconView}>
                    <Icon name="check" color="white"/>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={[styles.heading]}>{name}</Text>
                <Text style={[styles.text]}>{email}</Text>
            </View>
            {isSelected &&
                <View style={styles.selectedIconView}>
                <Icon name="check" color="white"/>
            </View>}
        </View>
    </TouchableOpacity>)
}



const styles = StyleSheet.create({
    mainContainer:{flex:1},
    item: {
        backgroundColor: colors.secondary,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.defaultMargin,
        marginBottom: Metrics.defaultMargin,
        overflow: 'hidden',
    },
    imageView: {
        width: Metrics.screenWidth * 0.15,
        height: Metrics.screenWidth * 0.15,
        borderRadius: Metrics.screenWidth * 0.15,
        backgroundColor: colors.white,
        padding: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
        tintColor: colors.primary,
    },
    iconView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
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
    textView: {
        marginLeft: Metrics.defaultMargin,
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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


export default React.memo(ContactsItem);
