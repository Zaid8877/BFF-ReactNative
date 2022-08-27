import React from 'react';
import {View, StatusBar, Platform, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {Colors, Metrics} from '../../Theme';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from "../../Theme/Colors";

const {screenWidth} = Metrics;

export const CustomerLoader = () => {
    return (
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <ActivityIndicator color={colors.textDark} size={'small'}/>
        </View>
    );
};
const RootView  =({
        style,
        children,
        top,
        bottom,
        statusBar = Colors.light,
        barStyle = 'dark-content',
        background = top == 0 ? 'transparent' : Colors.light,
        showCircle = false,
        lightCircle = false,
        rightCircle = false,
        isLoading = false,
        hasSpinner = true,

    }) => {
    return (
        <KeyboardAvoidingView behavior={'padding'} enabled={true} style={{flex: 1, backgroundColor: statusBar}}>
            <StatusBar
                translucent={true}
                barStyle={barStyle}
                backgroundColor={background}
            />
            <SafeAreaInsetsContext.Consumer>
                {insets => (
                    <View
                        style={{
                            flex: 1,
                            marginTop: top == 0 ? top : insets.top,
                            paddingBottom: bottom == 0 ? bottom : insets.bottom,
                            backgroundColor: background,
                            ...style,
                        }}>
                        {children}
                        {hasSpinner && (
                            <Spinner
                                visible={isLoading}
                                customIndicator={<CustomerLoader/>}
                                color={colors.primary}
                            />
                        )}
                    </View>
                )}
            </SafeAreaInsetsContext.Consumer>
            {showCircle && <View style={[{
                position: 'absolute',
                bottom: -screenWidth * 0.6,
                width: screenWidth,
                height: screenWidth,
                backgroundColor: Colors.primary,
                opacity: lightCircle ? 0.2 : 1,
                borderRadius: screenWidth,
                shadowColor: Colors.primary,
                shadowOffset: {
                    width: 10,
                    height: 10,
                },
                shadowOpacity: 0.8,
                shadowRadius: 24.00,
                elevation: 24,
            }, rightCircle ? {right: -screenWidth * 0.4} : {left: -screenWidth * 0.4}]}/>}
        </KeyboardAvoidingView>
    );
}
export default RootView;

